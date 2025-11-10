import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../store/useStore';
import {useTheme} from '../theme/ThemeContext';
import {useLanguage} from '../localization/LanguageContext';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {t} = useLanguage();
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);

  const languages = [
    {code: 'en', name: 'English', nativeName: 'English'},
    {code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt'},
  ];

  const handleLanguageSelect = (code: string) => {
    updateSettings({language: code});
    navigation.goBack();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {borderBottomColor: theme.colors.border}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.text}]}>
          {t('settings.language')}
        </Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.content}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[styles.languageItem, {borderBottomColor: theme.colors.border}]}
            onPress={() => handleLanguageSelect(lang.code)}>
            <View style={styles.languageInfo}>
              <Text style={[styles.languageName, {color: theme.colors.text}]}>{lang.name}</Text>
              <Text style={[styles.nativeName, {color: theme.colors.textSecondary}]}>{lang.nativeName}</Text>
            </View>
            {settings.language === lang.code && (
              <Icon name="checkmark" size={24} color={theme.colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 20, fontWeight: 'bold'},
  content: {flex: 1},
  languageItem: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1},
  languageInfo: {flex: 1},
  languageName: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  nativeName: {fontSize: 14},
});

export {LanguageScreen, styles};