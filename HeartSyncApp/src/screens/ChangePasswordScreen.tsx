import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    Alert.alert('Success', 'Your password has been changed successfully!', [
      {text: 'OK', onPress: () => navigation.goBack()}
    ]);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('settings.changePassword')}
        </Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.content}>
        <View style={[styles.inputContainer, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Current Password</Text>
          <View style={[styles.passwordField, {borderBottomColor: theme.colors.border}]}>
            <TextInput
              style={[styles.input, {color: theme.colors.text}]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrent}
              placeholder="Enter current password"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Icon name={showCurrent ? 'eye-outline' : 'eye-off-outline'} size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.inputContainer, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>New Password</Text>
          <View style={[styles.passwordField, {borderBottomColor: theme.colors.border}]}>
            <TextInput
              style={[styles.input, {color: theme.colors.text}]}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNew}
              placeholder="Enter new password"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Icon name={showNew ? 'eye-outline' : 'eye-off-outline'} size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.inputContainer, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Confirm New Password</Text>
          <View style={[styles.passwordField, {borderBottomColor: theme.colors.border}]}>
            <TextInput
              style={[styles.input, {color: theme.colors.text}]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              placeholder="Confirm new password"
              placeholderTextColor={theme.colors.textSecondary}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Icon name={showConfirm ? 'eye-outline' : 'eye-off-outline'} size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.changeButton, {backgroundColor: theme.colors.primary}]} onPress={handleChangePassword}>
          <Text style={styles.changeButtonText}>Change Password</Text>
        </TouchableOpacity>

        <View style={[styles.tips, {backgroundColor: theme.dark ? 'rgba(0, 188, 212, 0.1)' : '#E0F7FA'}]}>
          <Text style={[styles.tipsTitle, {color: theme.colors.primary}]}>Password Requirements:</Text>
          <Text style={[styles.tipItem, {color: theme.colors.primary}]}>• At least 6 characters long</Text>
          <Text style={[styles.tipItem, {color: theme.colors.primary}]}>• Mix of letters and numbers recommended</Text>
          <Text style={[styles.tipItem, {color: theme.colors.primary}]}>• Avoid common words</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  content: {padding: 20},
  inputContainer: {padding: 16, borderRadius: 12, marginBottom: 16},
  label: {fontSize: 14, fontWeight: '600', marginBottom: 8},
  passwordField: {flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 8},
  input: {flex: 1, fontSize: 16},
  changeButton: {padding: 16, borderRadius: 25, alignItems: 'center', marginTop: 20},
  changeButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  tips: {padding: 16, borderRadius: 12, marginTop: 20},
  tipsTitle: {fontSize: 14, fontWeight: '600', marginBottom: 8},
  tipItem: {fontSize: 13, marginTop: 4},
});

export {ChangePasswordScreen, styles};