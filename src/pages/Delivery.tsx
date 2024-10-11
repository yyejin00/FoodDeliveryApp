import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Complete from './Complete';
import Ing from './Ing';

const Stack = createNativeStackNavigator();
//stack delivery 화면눌렀을 때 Ing 화면이 보인다.
//그래서 스택으로 쌓음 지도(Ing)위에 완료(Complete)위에 쌓아 놓음
//지도를 보다가 완료 처리할 때 지도는 냅두고 위에 완료처리 화면을 있다 없다하게 만들기
//앱이 어떤 라우팅이 될지 구상해보기 중첩 컴포넌트 사용 많이 할거임~~
function Delivery() {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen
        name="Ing"
        component={Ing}
        options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default Delivery;
