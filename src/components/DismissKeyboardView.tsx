import React from 'react';
import {
  TouchableWithoutFeedback, //버튼이지만 반응 없는 태그
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = (
  {children, ...props}, //keyboard의 dismiss(함수) 키보드가 말그대로 없어진다 //accessible 시각장애를 가진 사용자를 위해 목소리로 화면설명함
) => (
  //근데 지금 사용하려는 기능은 비장애인들이 편하려고 만든 기능이니까 오히려 장애를 가진 사람들이 불편
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView
      {...props}
      style={props.style}
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
