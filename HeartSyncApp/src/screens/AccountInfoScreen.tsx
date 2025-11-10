import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../store/useStore';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

const AccountInfoScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const currentUser = useStore((state) => state.currentUser);
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);
  const saveProfile = useStore((state) => state.saveProfile);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    updateCurrentUser({name: name.trim(), email: email.trim()});
    saveProfile();
    Alert.alert('Success', 'Account information updated!');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('settings.accountInfo')}
        </Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.content}>
        <View style={[styles.infoCard, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>User ID</Text>
          <Text style={[styles.value, {color: theme.colors.text}]}>{currentUser?.id}</Text>
        </View>

        <View style={[styles.field, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Full Name</Text>
          <TextInput
            style={[styles.input, {color: theme.colors.text, borderBottomColor: theme.colors.border}]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={theme.colors.textSecondary}
          />
        </View>

        <View style={[styles.field, {backgroundColor: theme.colors.surface}]}>
          <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Email</Text>
          <TextInput
            style={[styles.input, {color: theme.colors.text, borderBottomColor: theme.colors.border}]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={[styles.saveButton, {backgroundColor: theme.colors.primary}]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('common.save')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  content: {padding: 20},
  infoCard: {padding: 16, borderRadius: 12, marginBottom: 20},
  field: {padding: 16, borderRadius: 12, marginBottom: 16},
  label: {fontSize: 14, fontWeight: '600', marginBottom: 8},
  value: {fontSize: 16},
  input: {fontSize: 16, borderBottomWidth: 1, paddingVertical: 8},
  saveButton: {padding: 16, borderRadius: 25, alignItems: 'center', marginTop: 20},
  saveButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export {AccountInfoScreen, styles};
