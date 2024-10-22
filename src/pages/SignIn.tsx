import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInSreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInSreenProps) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const canGoNext = email && password; //직관적인 코드
  const emailRef = useRef<TextInput | null>(null); //제너릭(<>) 타입스크립트에만 있음
  const passwordRef = useRef<TextInput | null>(null); //useRef의 타입을 알려줌

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp'); //app에서 타입스크립트로 나눠놓은 것.
  }, [navigation]);

  const onChangeEmail = useCallback(text => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback(text => {
    setPassword(text);
  }, []);

  const onSubmit = useCallback(() => {
    // 로그인 로직
    if (!email || !email.trim()) {
      //trim 좌우공백없애기
      return Alert.alert('알림', '이메일을 입력해주세요~!');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요~!');
    }
    Alert.alert('로그인 성공', '쓰껄');
  }, [email, password]);

  return (
    <DismissKeyboardView>
      <View style={Styles.InputWrapper}>
        <Text style={Styles.label}>이메일</Text>
        <TextInput
          style={Styles.textInput}
          placeholder=" 이메일을 입력하세요.."
          onChangeText={onChangeEmail}
          value={email}
          importantForAccessibility="yes" //계정 이메일, 비번 저장 기능
          autoComplete="email"
          keyboardType="email-address" //키보드 타입 @, .com 키보드에 뜬다.
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus(); //passwordFef에 포커스 주기 커서이동
          }}
          blurOnSubmit={false} //키보드 내리기 방지
          ref={emailRef}
        />
      </View>
      <View style={Styles.InputWrapper}>
        <Text style={Styles.label}>비밀번호</Text>
        <TextInput
          style={Styles.textInput}
          placeholder=" 비밀번호를 입력하세요.."
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry // 비밀번호 미리보기 방지
          importantForAccessibility="yes" //계정 이메일, 비번 저장 기능
          autoComplete="password"
          //textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit} //패스워드 치고 엔터치면 바로 로그인되도록
          //엔터쳤을 때 다음 어떤 동작을 할지
        />
      </View>
      <View style={Styles.ButtonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !email || !password //이런 부분 따로 빼서 변수이름 짓기 ex const canGoNext
              ? Styles.logInButton
              : StyleSheet.compose(Styles.logInButton, Styles.logInButtonActive) //배열, 뒤에 있는 것이 우선순위높음
          }
          disabled={!canGoNext}>
          <Text style={Styles.logInButtonText}>로그인하기</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text style={Styles.logInButtonTextt}>회원가입하기</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}
const Styles = StyleSheet.create({
  InputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ButtonZone: {
    alignItems: 'center',
    color: 'white',
  },
  logInButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logInButtonActive: {
    backgroundColor: '#89D4FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },

  logInButtonText: {
    fontSize: 14,
  },
  logInButtonTextt: {
    color: '#66b2ff',
  },
});
export default SignIn;
