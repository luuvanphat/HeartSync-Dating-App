import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useStore} from '../store/useStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const currentUser = useStore((state) => state.currentUser);
  const profileCompletion = useStore((state) => state.profileCompletion);

  if (!currentUser) {
    return (
      <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.errorText, {color: theme.colors.error}]}>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.profileCard, {backgroundColor: theme.colors.surface}]}>
        <View style={styles.imageContainer}>
          <Image source={{uri: currentUser.photos[0]}} style={styles.profileImage} />
          <View style={[styles.completionBadge, {backgroundColor: theme.colors.primary}]}>
            <Text style={styles.completionText}>{profileCompletion}% complete</Text>
          </View>
        </View>

        <View style={styles.nameContainer}>
          <Text style={[styles.name, {color: theme.colors.text}]}>
            {currentUser.name}, {currentUser.age}
          </Text>
          {currentUser.verified && <Icon name="checkmark-circle" size={24} color={theme.colors.primary} />}
        </View>

        <TouchableOpacity
          style={[styles.editButton, {backgroundColor: theme.dark ? 'rgba(0, 188, 212, 0.1)' : '#E0F7FA'}]}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={[styles.editButtonText, {color: theme.colors.primary}]}>
            {t('profile.editProfile')}
          </Text>
          <Icon name="chevron-forward" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.verificationCard, {backgroundColor: theme.colors.surface}]}>
        <Icon name="shield-checkmark" size={40} color={theme.colors.primary} />
        <View style={styles.verificationText}>
          <Text style={[styles.verificationTitle, {color: theme.colors.textSecondary}]}>
            Verification adds an extra layer of authenticity and trust to your profile.
          </Text>
          <Text style={[styles.verificationLink, {color: theme.colors.primary}]}>
            Verify your account now!
          </Text>
        </View>
        <Icon name="chevron-forward" size={24} color={theme.colors.textSecondary} />
      </View>

      <View style={[styles.tabs, {backgroundColor: theme.colors.surface}]}>
        <TouchableOpacity style={[styles.tab, styles.activeTab, {borderBottomColor: theme.colors.primary}]}>
          <Text style={[styles.tabText, styles.activeTabText, {color: theme.colors.primary}]}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={[styles.tabText, {color: theme.colors.textSecondary}]}>Safety</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.premiumCard, {backgroundColor: theme.colors.primary}]}>
        <View style={styles.premiumHeader}>
          <Icon name="star" size={20} color="#fff" />
          <Text style={styles.premiumTitle}>HeartSync Premium</Text>
          <Icon name="star" size={20} color="#fff" />
        </View>
        <Text style={styles.premiumSubtitle}>
          Unlock exclusive features and supercharge your dating experience.
        </Text>
        <TouchableOpacity 
          style={styles.upgradeButton}
          onPress={() => navigation.navigate('UpgradePremium')}>
          <Text style={[styles.upgradeButtonText, {color: theme.colors.primary}]}>
            Upgrade from $7.99
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.featuresCard, {backgroundColor: theme.colors.surface}]}>
        <View style={styles.featureHeader}>
          <Text style={[styles.featureTitle, {color: theme.colors.text}]}>What's included</Text>
          <View style={styles.planTypes}>
            <Text style={[styles.planType, {color: theme.colors.text}]}>Free</Text>
            <Text style={[styles.planType, styles.premiumPlan, {color: theme.colors.primary}]}>Premium</Text>
          </View>
        </View>

        {[
          {name: 'Unlimited swipes', free: true, premium: true},
          {name: 'Advanced filters', free: true, premium: true},
          {name: 'Remove ads', free: false, premium: true},
          {name: 'Undo accidental left swipes', free: false, premium: true},
          {name: 'Push you profile to more viewers', free: false, premium: true},
        ].map((feature, index) => (
          <View key={index} style={[styles.featureRow, {borderBottomColor: theme.colors.border}]}>
            <Text style={[styles.featureName, {color: theme.colors.text}]}>{feature.name}</Text>
            <View style={styles.featureChecks}>
              <Icon
                name={feature.free ? 'checkmark' : 'close'}
                size={20}
                color={feature.free ? theme.colors.primary : theme.colors.disabled}
              />
              <Icon
                name={feature.premium ? 'checkmark' : 'close'}
                size={20}
                color={feature.premium ? theme.colors.primary : theme.colors.disabled}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16},
  profileCard: {padding: 20, marginTop: 12},
  imageContainer: {position: 'relative', alignSelf: 'flex-start'},
  profileImage: {width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#00BCD4'},
  completionBadge: {position: 'absolute', bottom: -5, left: 0, right: 0, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 8},
  completionText: {color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center'},
  nameContainer: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16},
  name: {fontSize: 24, fontWeight: 'bold'},
  editButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, padding: 12, borderRadius: 8},
  editButtonText: {fontSize: 16, fontWeight: '600'},
  verificationCard: {flexDirection: 'row', alignItems: 'center', padding: 16, marginTop: 12, gap: 12},
  verificationText: {flex: 1},
  verificationTitle: {fontSize: 14, marginBottom: 4},
  verificationLink: {fontSize: 14, fontWeight: '600'},
  tabs: {flexDirection: 'row', marginTop: 12},
  tab: {flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent'},
  activeTab: {},
  tabText: {fontSize: 16},
  activeTabText: {fontWeight: 'bold'},
  premiumCard: {padding: 24, margin: 16, borderRadius: 16, alignItems: 'center'},
  premiumHeader: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12},
  premiumTitle: {fontSize: 22, fontWeight: 'bold', color: '#fff'},
  premiumSubtitle: {fontSize: 14, color: '#fff', textAlign: 'center', marginBottom: 16},
  upgradeButton: {backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 25},
  upgradeButtonText: {fontSize: 16, fontWeight: 'bold'},
  featuresCard: {padding: 16, marginHorizontal: 16, marginBottom: 16, borderRadius: 12},
  featureHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16},
  featureTitle: {fontSize: 18, fontWeight: 'bold'},
  planTypes: {flexDirection: 'row', gap: 40},
  planType: {fontSize: 14, fontWeight: '600'},
  premiumPlan: {},
  featureRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1},
  errorText: {fontSize: 16, fontWeight: '600'},
  featureName: {fontSize: 14, flex: 1},
  featureChecks: {flexDirection: 'row', gap: 40},
});

export default ProfileScreen;