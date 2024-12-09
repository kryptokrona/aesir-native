import { useLayoutEffect, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  Card,
  Container,
  Header,
  InputField,
  Pincode,
  ScreenLayout,
  TextButton,
  TextField,
} from '@/components';
import { AuthScreens, MainScreens, Stacks, nameMaxLength } from '@/config';
import {
  useGlobalStore,
  usePreferencesStore,
  useThemeStore,
  useUserStore,
  createWallet
} from '@/services';
import { AuthMethods, AuthStackNavigationType } from '@/types';

import { initDB } from '../../services/sqlite';

export const CreateAccScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AuthStackNavigationType>();
  const mainNavigation = useNavigation<any>();

  const theme = useThemeStore((state) => state.theme);
  const backgroundColor = theme.accentForeground;
  const borderColor = theme.border;

  const [name, setName] = useState<string>('');
  const [authMethod, setAuthMethod] = useState<AuthMethods>(
    AuthMethods.reckless,
  );
  const [pincode, setPincode] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const nameError = !name || name.length === 0;

  const pinError = authMethod === 'pincode' && pincode.length < 6;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('createNewAccount')} />,
    });
  }, [t]);

  function onNameInput(value: string) {
    setName(value);
  }

  async function onCreateProfile() {
    setLoading(true);
    await initDB();

    const address = await createWallet();

    useUserStore.setState((state) => ({
      ...state,
      user: {
        ...state.user,
        address
      },
    }));

    usePreferencesStore.setState((state) => ({
      ...state,
      preferences: {
        ...state.preferences,
        authMethod,
        pincode: authMethod === 'pincode' ? pincode : null,
      },
    }));

    useGlobalStore.getState().setAuthenticated(true);

    if (authMethod === AuthMethods.pincode) {
      navigation.navigate(AuthScreens.RequestPinScreen, {
        finishFunction: () => {
          mainNavigation.navigate(Stacks.MainStack, {
            screen: MainScreens.GroupsScreen,
          });
        },
      });
    }

    if (authMethod === AuthMethods.bioMetric) {
      navigation.navigate(AuthScreens.RequestFingerPrintScreen, {
        finishFunction: () => {
          mainNavigation.navigate(Stacks.MainStack, {
            screen: MainScreens.GroupsScreen,
          });
        },
      });
    }

    if (authMethod === AuthMethods.reckless) {
      mainNavigation.navigate(Stacks.MainStack, {
        screen: MainScreens.GroupsScreen,
      });
    }
  }

  function onEnterPin(pin: string) {
    setPincode(pin);
  }

  return (
    <ScreenLayout>

      <Card>
        {/* // TODO translation */}
        <TextField size="small">{t('authenticateHow')}</TextField>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setAuthMethod(AuthMethods.reckless)}>
            <View
              style={
                authMethod === AuthMethods.reckless
                  ? [styles.radioSelected, { backgroundColor }]
                  : [styles.radioUnselected, { borderColor }]
              }
            />
            <TextField type="muted" size="small">
              {t('noAuth')}
            </TextField>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => {
              setAuthMethod(AuthMethods.pincode);
              setPincode('');
            }}>
            <View
              style={
                authMethod === AuthMethods.pincode
                  ? [styles.radioSelected, { backgroundColor }]
                  : [styles.radioUnselected, { borderColor }]
              }
            />
            <TextField type="muted" size="small">
              {t('usePinCode')}
            </TextField>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setAuthMethod(AuthMethods.bioMetric)}>
            <View
              style={
                authMethod === AuthMethods.bioMetric
                  ? [styles.radioSelected, { backgroundColor }]
                  : [styles.radioUnselected, { borderColor }]
              }
            />
            <TextField type="muted" size="small">
              {t('useHardware')}
            </TextField>
          </TouchableOpacity>
        </View>

        {authMethod === 'pincode' && (
          <View>
            <Pincode onFinish={onEnterPin} onPartPin={() => ''} />
          </View>
        )}
      </Card>

      <Container bottom>
        <TextButton
          onPress={onCreateProfile}
          disabled={loading || pinError}>
          {t('continue')}
        </TextButton>
      </Container>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  radioSelected: {
    borderRadius: 10,
    height: 20,
    marginRight: 10,
    width: 20,
  },
  radioText: {
    fontSize: 16,
  },
  radioUnselected: {
    borderColor: '#999',
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    marginRight: 10,
    width: 20,
  },
});