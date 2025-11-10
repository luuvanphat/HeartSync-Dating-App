import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

// Help Center Screen
export const HelpCenterScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, tap on "Sign Up" on the welcome screen and fill in your details including email, password, and basic profile information.',
    },
    {
      question: 'How does matching work?',
      answer: 'When you swipe right on someone and they also swipe right on you, it\'s a match! You can then start chatting with each other.',
    },
    {
      question: 'How do I report or block someone?',
      answer: 'In any chat or profile, tap the three dots menu and select either "Report" or "Block" to take action.',
    },
    {
      question: 'What is HeartSync Premium?',
      answer: 'HeartSync Premium gives you access to unlimited swipes, advanced filters, the ability to see who liked you, and many more exclusive features.',
    },
    {
      question: 'How do I delete my account?',
      answer: 'Go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone.',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>Help Center</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Frequently Asked Questions
          </Text>
          
          {faqs.map((faq, index) => (
            <View key={index} style={[styles.faqItem, {backgroundColor: theme.colors.surface}]}>
              <Text style={[styles.question, {color: theme.colors.text}]}>
                {faq.question}
              </Text>
              <Text style={[styles.answer, {color: theme.colors.textSecondary}]}>
                {faq.answer}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.contactSection, {backgroundColor: theme.colors.surface}]}>
          <Icon name="mail" size={32} color={theme.colors.primary} />
          <Text style={[styles.contactTitle, {color: theme.colors.text}]}>
            Need More Help?
          </Text>
          <Text style={[styles.contactText, {color: theme.colors.textSecondary}]}>
            Contact our support team at
          </Text>
          <Text style={[styles.contactEmail, {color: theme.colors.primary}]}>
            support@heartsync.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Terms & Conditions Screen
export const TermsConditionsScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          Terms & Conditions
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.lastUpdated, {color: theme.colors.textSecondary}]}>
            Last Updated: November 9, 2024
          </Text>

          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            Welcome to HeartSync! These terms and conditions outline the rules and regulations for the use of HeartSync's services.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            1. Acceptance of Terms
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            By accessing and using HeartSync, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            2. User Account
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account and password.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            3. User Conduct
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            Users must not use the service to post content that is illegal, offensive, or violates the rights of others. HeartSync reserves the right to terminate accounts that violate these terms.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            4. Content
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            Users retain ownership of content they post. However, by posting content, you grant HeartSync a worldwide, non-exclusive license to use, reproduce, and display your content.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            5. Subscription and Payments
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            Premium subscriptions are billed monthly or annually. Subscriptions automatically renew unless cancelled before the renewal date. No refunds for partial subscription periods.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            6. Termination
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            HeartSync reserves the right to terminate or suspend access to the service immediately, without prior notice, for conduct that violates these Terms or is harmful to other users.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            7. Changes to Terms
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            HeartSync reserves the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            8. Contact Information
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            For questions about these Terms, please contact us at legal@heartsync.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Privacy Policy Screen
export const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          Privacy Policy
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.lastUpdated, {color: theme.colors.textSecondary}]}>
            Last Updated: November 9, 2024
          </Text>

          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            HeartSync ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            1. Information We Collect
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We collect information you provide directly to us, including:
            {'\n'}- Name, email address, and phone number
            {'\n'}- Profile information (photos, bio, preferences)
            {'\n'}- Usage data and interactions with other users
            {'\n'}- Location data (with your permission)
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            2. How We Use Your Information
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We use your information to:
            {'\n'}- Provide and improve our services
            {'\n'}- Match you with other users
            {'\n'}- Send you notifications and updates
            {'\n'}- Prevent fraud and ensure safety
            {'\n'}- Comply with legal obligations
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            3. Information Sharing
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We do not sell your personal information. We may share your information:
            {'\n'}- With other users as part of the service
            {'\n'}- With service providers who assist our operations
            {'\n'}- When required by law
            {'\n'}- With your consent
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            4. Your Rights
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            You have the right to:
            {'\n'}- Access your personal data
            {'\n'}- Correct inaccurate data
            {'\n'}- Delete your account and data
            {'\n'}- Opt-out of marketing communications
            {'\n'}- Export your data
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            5. Data Security
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            6. Data Retention
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We retain your information for as long as your account is active or as needed to provide services. You can request deletion at any time.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            7. Children's Privacy
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            HeartSync is not intended for users under 18 years of age. We do not knowingly collect information from children.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            8. Changes to Privacy Policy
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </Text>

          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            9. Contact Us
          </Text>
          <Text style={[styles.paragraph, {color: theme.colors.text}]}>
            For questions about this Privacy Policy, please contact us at privacy@heartsync.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Verification Screen
export const VerificationScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          Verification
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.verificationHero}>
          <Icon name="shield-checkmark" size={80} color={theme.colors.primary} />
          <Text style={[styles.verificationTitle, {color: theme.colors.text}]}>
            Verify Your Account
          </Text>
          <Text style={[styles.verificationSubtitle, {color: theme.colors.textSecondary}]}>
            Get the blue checkmark badge and build trust with other users
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Why Verify?
          </Text>
          
          <View style={styles.benefitItem}>
            <Icon name="checkmark-circle" size={24} color={theme.colors.success} />
            <View style={styles.benefitText}>
              <Text style={[styles.benefitTitle, {color: theme.colors.text}]}>
                Build Trust
              </Text>
              <Text style={[styles.benefitDescription, {color: theme.colors.textSecondary}]}>
                Verified profiles get 3x more matches
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Icon name="shield" size={24} color={theme.colors.success} />
            <View style={styles.benefitText}>
              <Text style={[styles.benefitTitle, {color: theme.colors.text}]}>
                Safety First
              </Text>
              <Text style={[styles.benefitDescription, {color: theme.colors.textSecondary}]}>
                Help keep the community safe and authentic
              </Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Icon name="star" size={24} color={theme.colors.success} />
            <View style={styles.benefitText}>
              <Text style={[styles.benefitTitle, {color: theme.colors.text}]}>
                Stand Out
              </Text>
              <Text style={[styles.benefitDescription, {color: theme.colors.textSecondary}]}>
                Get the blue verified badge on your profile
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            How It Works
          </Text>
          
          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, {backgroundColor: theme.colors.primary}]}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, {color: theme.colors.text}]}>
                Take a Selfie
              </Text>
              <Text style={[styles.stepDescription, {color: theme.colors.textSecondary}]}>
                Follow the on-screen instructions to take a real-time photo
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, {backgroundColor: theme.colors.primary}]}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, {color: theme.colors.text}]}>
                Review
              </Text>
              <Text style={[styles.stepDescription, {color: theme.colors.textSecondary}]}>
                Our team will review your verification request within 24 hours
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={[styles.stepNumber, {backgroundColor: theme.colors.primary}]}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, {color: theme.colors.text}]}>
                Get Verified
              </Text>
              <Text style={[styles.stepDescription, {color: theme.colors.textSecondary}]}>
                Receive your verification badge and increased visibility
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.verifyButton, {backgroundColor: theme.colors.primary}]}>
          <Icon name="camera" size={20} color="#fff" />
          <Text style={styles.verifyButtonText}>Start Verification</Text>
        </TouchableOpacity>

        <Text style={[styles.disclaimer, {color: theme.colors.textSecondary}]}>
          Your verification photo is only used for verification purposes and will not be shown on your profile.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lastUpdated: {
    fontSize: 12,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  faqItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactSection: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
  },
  contactEmail: {
    fontSize: 16,
    fontWeight: '600',
  },
  verificationHero: {
    alignItems: 'center',
    padding: 32,
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  verificationSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 28,
    gap: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    padding: 20,
    lineHeight: 18,
  },
});

export default {HelpCenterScreen, TermsConditionsScreen, PrivacyPolicyScreen, VerificationScreen};