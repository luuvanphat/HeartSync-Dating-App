import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, RefreshControl, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStore} from '../store/useStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, User} from '../types';
import SwipeCard from '../components/SwipeCard';
import MatchModal from '../components/MatchModal';
import DrawerMenu from '../components/DrawerMenu';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';
import SafeContainer from '../components/SafeContainer';

const {width} = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SwipeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const {users, swipeLeft, swipeRight, swipeSuperLike, getNextUser, matches, applyFilters, superLikes} = useStore();
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = getNextUser();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    applyFilters();
    setRefreshing(false);
  };

  const handleSwipeLeft = () => {
    if (currentUser) {
      swipeLeft(currentUser.id);
    }
  };

  const handleSwipeRight = () => {
    if (currentUser) {
      const isMatch = Math.random() > 0.3;
      swipeRight(currentUser.id);
      
      if (isMatch) {
        setMatchedUser(currentUser);
        setShowMatchModal(true);
      }
    }
  };

  const handleSuperLike = () => {
    if (superLikes <= 0) {
      Alert.alert(
        '⭐ No Super Likes Left',
        'You\'ve used all your Super Likes for today! Super Likes reset daily or upgrade to Premium for unlimited Super Likes.',
        [
          {text: 'OK', style: 'cancel'},
          {text: 'Upgrade to Premium', onPress: () => navigation.navigate('UpgradePremium')},
        ]
      );
      return;
    }

    if (currentUser) {
      const isMatch = Math.random() > 0.2; // 80% match rate for super like
      swipeSuperLike(currentUser.id);
      
      if (isMatch) {
        setMatchedUser(currentUser);
        setShowMatchModal(true);
      }
      
      Alert.alert(
        '⭐ Super Like Sent!',
        `You have ${superLikes - 1} Super Likes remaining today.`,
        [{text: 'OK'}]
      );
    }
  };

  const handleSendMessage = () => {
    setShowMatchModal(false);
    const match = matches.find(m => m.user.id === matchedUser?.id);
    if (match) {
      navigation.navigate('ChatDetail', {matchId: match.id});
    }
  };

  if (!currentUser) {
    return (
      <SafeContainer style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={[styles.header, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border}]}>
          <TouchableOpacity onPress={() => setDrawerOpen(!drawerOpen)}>
            <Icon name="menu" size={28} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
            {t('swipe.title')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
            <Icon name="options" size={28} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.emptyContainer}>
          <Icon name="heart-dislike" size={80} color={theme.colors.disabled} />
          <Text style={[styles.emptyText, {color: theme.colors.textSecondary}]}>
            {t('swipe.noMoreProfiles')}
          </Text>
          <Text style={[styles.emptySubtext, {color: theme.colors.textSecondary}]}>
            {t('swipe.noMoreProfilesDesc')}
          </Text>
          <TouchableOpacity 
            style={[styles.adjustFiltersButton, {backgroundColor: theme.colors.primary}]}
            onPress={() => navigation.navigate('Filters')}>
            <Icon name="options-outline" size={20} color="#fff" />
            <Text style={styles.adjustFiltersText}>{t('swipe.adjustFilters')}</Text>
          </TouchableOpacity>
        </View>

        <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </SafeContainer>
    );
  }

  return (
    <SafeContainer style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)}>
          <Icon name="menu" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('swipe.title')}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Icon name="options" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* {superLikes > 0 && (
        <View style={[styles.superLikeBanner, {backgroundColor: theme.colors.card}]}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={[styles.superLikeText, {color: theme.colors.text}]}>
            {superLikes} Super Likes remaining today
          </Text>
        </View>
      )} */}

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
            title={t('swipe.findingNewPeople')}
            titleColor={theme.colors.primary}
          />
        }>
        <View style={styles.cardContainer}>
          <SwipeCard
            user={currentUser}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton, {backgroundColor: theme.colors.surface}]} 
          onPress={handleSwipeLeft}>
          <Icon name="close" size={32} color="#FF6B6B" />
        </TouchableOpacity>

        {/* <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton, {backgroundColor: theme.colors.surface}]}
          onPress={handleSuperLike}>
          <Icon name="star" size={28} color="#FFD700" />
          {superLikes > 0 && (
            <View style={styles.superLikeBadge}>
              <Text style={styles.superLikeBadgeText}>{superLikes}</Text>
            </View>
          )}
        </TouchableOpacity> */}

        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton, {backgroundColor: theme.colors.surface}]} 
          onPress={handleSwipeRight}>
          <Icon name="heart" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <MatchModal
        visible={showMatchModal}
        user={matchedUser}
        onClose={() => setShowMatchModal(false)}
        onSendMessage={handleSendMessage}
      />

      <DrawerMenu visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 24, fontWeight: 'bold'},
  superLikeBanner: {padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6},
  superLikeText: {fontSize: 13, fontWeight: '600'},
  scrollContainer: {flex: 1},
  scrollContent: {flexGrow: 1},
  cardContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  actions: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, gap: 20},
  actionButton: {width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4},
  passButton: {width: 70, height: 70, borderRadius: 35},
  likeButton: {width: 70, height: 70, borderRadius: 35},
  superLikeButton: {position: 'relative'},
  superLikeBadge: {position: 'absolute', top: -4, right: -4, backgroundColor: '#FF3B30', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4},
  superLikeBadgeText: {color: '#fff', fontSize: 11, fontWeight: 'bold'},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
  emptyText: {fontSize: 24, fontWeight: 'bold', marginTop: 20},
  emptySubtext: {fontSize: 16, marginTop: 8, textAlign: 'center'},
  adjustFiltersButton: {flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25, marginTop: 20, gap: 8},
  adjustFiltersText: {color: '#fff', fontSize: 16, fontWeight: '600'},
});

export default SwipeScreen;