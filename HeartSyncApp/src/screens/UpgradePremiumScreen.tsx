import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

const {width} = Dimensions.get('window');

const UpgradePremiumScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('6months');

  const plans = [
    {
      id: '1month',
      duration: '1 Month',
      price: '$19.99',
      perMonth: '$19.99/month',
      savings: null,
      popular: false,
    },
    {
      id: '3months',
      duration: '3 Months',
      price: '$44.99',
      perMonth: '$14.99/month',
      savings: 'Save 25%',
      popular: false,
    },
    {
      id: '6months',
      duration: '6 Months',
      price: '$59.99',
      perMonth: '$9.99/month',
      savings: 'Save 50%',
      popular: true,
    },
    {
      id: '12months',
      duration: '12 Months',
      price: '$95.99',
      perMonth: '$7.99/month',
      savings: 'Save 60%',
      popular: false,
    },
  ];

  const features = [
    {
      icon: 'infinite',
      title: 'Unlimited Swipes',
      description: 'Swipe as much as you want, no daily limits',
    },
    {
      icon: 'funnel',
      title: 'Advanced Filters',
      description: 'Find exactly who you are looking for',
    },
    {
      icon: 'eye-off',
      title: 'Remove Ads',
      description: 'Enjoy distraction-free browsing',
    },
    {
      icon: 'arrow-undo',
      title: 'Undo Swipes',
      description: 'Take back accidental left swipes',
    },
    {
      icon: 'trending-up',
      title: 'Boost Profile',
      description: 'Get 10x more profile views',
    },
    {
      icon: 'eye',
      title: 'See Who Likes You',
      description: 'Match instantly with people who liked you',
    },
    {
      icon: 'star',
      title: '5 Super Likes/Day',
      description: 'Stand out and get 3x more matches',
    },
    {
      icon: 'globe',
      title: 'Passport',
      description: 'Swipe anywhere in the world',
    },
    {
      icon: 'shield-checkmark',
      title: 'Priority Support',
      description: '24/7 customer support',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>Upgrade to Premium</Text>
        <View style={{width: 28}} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={[styles.iconContainer, {backgroundColor: theme.dark ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255,255,255,0.2)'}]}>
            <Icon name="star" size={60} color="#FFD700" />
          </View>
          <Text style={[styles.heroTitle, {color: theme.colors.text}]}>Unlock All Features</Text>
          <Text style={[styles.heroSubtitle, {color: theme.colors.textSecondary}]}>
            Get the most out of HeartSync and find your perfect match faster
          </Text>
        </View>

        <View style={styles.plansSection}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Choose Your Plan</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                {backgroundColor: theme.colors.surface, borderColor: theme.colors.border},
                selectedPlan === plan.id && {borderColor: theme.colors.primary, backgroundColor: theme.dark ? 'rgba(0, 188, 212, 0.1)' : '#E0F7FA'},
              ]}
              onPress={() => setSelectedPlan(plan.id)}>
              {plan.popular && (
                <View style={[styles.popularBadge, {backgroundColor: theme.colors.error}]}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                <View style={styles.planLeft}>
                  <View
                    style={[
                      styles.radioButton,
                      {borderColor: theme.colors.border},
                      selectedPlan === plan.id && {borderColor: theme.colors.primary},
                    ]}>
                    {selectedPlan === plan.id && (
                      <View style={[styles.radioInner, {backgroundColor: theme.colors.primary}]} />
                    )}
                  </View>
                  <View>
                    <Text style={[styles.planDuration, {color: theme.colors.text}]}>{plan.duration}</Text>
                    <Text style={[styles.planPerMonth, {color: theme.colors.textSecondary}]}>{plan.perMonth}</Text>
                  </View>
                </View>
                <View style={styles.planRight}>
                  {plan.savings && (
                    <Text style={[styles.savingsText, {color: theme.colors.success}]}>{plan.savings}</Text>
                  )}
                  <Text style={[styles.planPrice, {color: theme.colors.primary}]}>{plan.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.featuresSection, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Premium Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIcon, {backgroundColor: theme.dark ? 'rgba(0, 188, 212, 0.1)' : '#E0F7FA'}]}>
                <Icon name={feature.icon} size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, {color: theme.colors.text}]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, {color: theme.colors.textSecondary}]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.guaranteeSection, {backgroundColor: theme.colors.surface}]}>
          <Icon name="shield-checkmark" size={40} color={theme.colors.success} />
          <Text style={[styles.guaranteeTitle, {color: theme.colors.text}]}>
            7-Day Money Back Guarantee
          </Text>
          <Text style={[styles.guaranteeText, {color: theme.colors.textSecondary}]}>
            Not satisfied? Get a full refund within 7 days, no questions asked.
          </Text>
        </View>

        <View style={[styles.trustSection, {backgroundColor: theme.colors.card}]}>
          <View style={styles.trustItem}>
            <Icon name="people" size={32} color={theme.colors.primary} />
            <Text style={[styles.trustNumber, {color: theme.colors.text}]}>2M+</Text>
            <Text style={[styles.trustLabel, {color: theme.colors.textSecondary}]}>Premium Users</Text>
          </View>
          <View style={styles.trustItem}>
            <Icon name="heart" size={32} color="#FF6B6B" />
            <Text style={[styles.trustNumber, {color: theme.colors.text}]}>500K+</Text>
            <Text style={[styles.trustLabel, {color: theme.colors.textSecondary}]}>Matches Daily</Text>
          </View>
          <View style={styles.trustItem}>
            <Icon name="star" size={32} color="#FFD700" />
            <Text style={[styles.trustNumber, {color: theme.colors.text}]}>4.8/5</Text>
            <Text style={[styles.trustLabel, {color: theme.colors.textSecondary}]}>User Rating</Text>
          </View>
        </View>

        <Text style={[styles.termsText, {color: theme.colors.textSecondary}]}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
          Subscription automatically renews unless auto-renew is turned off at
          least 24 hours before the end of the current period.
        </Text>
      </ScrollView>

      <View style={[styles.footer, {borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface}]}>
        <TouchableOpacity style={[styles.upgradeButton, {backgroundColor: theme.colors.primary}]}>
          <Text style={styles.upgradeButtonText}>
            Continue with {plans.find(p => p.id === selectedPlan)?.price}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.footerText, {color: theme.colors.textSecondary}]}>
          Cancel anytime
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 18, fontWeight: 'bold'},
  content: {flex: 1},
  heroSection: {alignItems: 'center', padding: 32},
  iconContainer: {width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 20},
  heroTitle: {fontSize: 28, fontWeight: 'bold', marginBottom: 12},
  heroSubtitle: {fontSize: 16, textAlign: 'center', paddingHorizontal: 20},
  plansSection: {padding: 20},
  sectionTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 16},
  planCard: {borderRadius: 16, borderWidth: 2, padding: 16, marginBottom: 12, position: 'relative'},
  planCardSelected: {},
  popularBadge: {position: 'absolute', top: -10, right: 20, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12},
  popularText: {color: '#fff', fontSize: 11, fontWeight: 'bold'},
  planHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  planLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  radioButton: {width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center'},
  radioButtonSelected: {},
  radioInner: {width: 12, height: 12, borderRadius: 6},
  planDuration: {fontSize: 18, fontWeight: 'bold'},
  planPerMonth: {fontSize: 14},
  planRight: {alignItems: 'flex-end'},
  savingsText: {fontSize: 12, fontWeight: 'bold', marginBottom: 4},
  planPrice: {fontSize: 20, fontWeight: 'bold'},
  featuresSection: {padding: 20},
  featureItem: {flexDirection: 'row', marginBottom: 20, gap: 16},
  featureIcon: {width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center'},
  featureText: {flex: 1},
  featureTitle: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  featureDescription: {fontSize: 14},
  guaranteeSection: {alignItems: 'center', padding: 24},
  guaranteeTitle: {fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 8},
  guaranteeText: {fontSize: 14, textAlign: 'center'},
  trustSection: {flexDirection: 'row', justifyContent: 'space-around', padding: 20},
  trustItem: {alignItems: 'center'},
  trustNumber: {fontSize: 24, fontWeight: 'bold', marginTop: 8},
  trustLabel: {fontSize: 12, marginTop: 4},
  termsText: {fontSize: 11, textAlign: 'center', padding: 20, lineHeight: 16},
  footer: {padding: 20, borderTopWidth: 1},
  upgradeButton: {borderRadius: 28, paddingVertical: 16, alignItems: 'center', marginBottom: 12, elevation: 4, shadowColor: '#00BCD4', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8},
  upgradeButtonText: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  footerText: {fontSize: 14, textAlign: 'center'},
});

export default UpgradePremiumScreen;