// const App = () => {
//   return (
//     <NavigationContainer>

//     </NavigationContainer>
//   );
// };

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen
      name="todo"
      component={ColumnScreen}
      initialParams={{columnName: 'todo'}}
    />
    <Tab.Screen
      name="in Progress"
      component={ColumnScreen}
      initialParams={{columnName: 'inprogress'}}
    />
    <Tab.Screen
      name="testing"
      component={ColumnScreen}
      initialParams={{columnName: 'testing'}}
    />
    <Tab.Screen
      name="done"
      component={ColumnScreen}
      initialParams={{columnId: 'done'}}
    />
  </Tab.Navigator>
</NavigationContainer>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

<View>
  {/* <Button title="Load cards" onPress={loadCards}></Button>
      <Button title="Create card for 2958" onPress={createCard}></Button>
      <Button
        title="Check store"
        onPress={() => {
          console.log(cards);
        }}></Button> */}
  {/* <View style={styles.container}>
        <Text>CARDS</Text>
        {cards.map((item, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </View> */}
</View>;

<Tab.Navigator
  tabBarOptions={{
    activeTintColor: '#72A8BC',
    labelStyle: {
      fontSize: 14,
      color: 'white',
    },
    style: {
      backgroundColor: '#BFB393',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      elevation: 0,
    },
  }}>
  <Tab.Screen
    name="todo"
    component={ColumnStackNavigator}
    initialParams={{columnId: 2957}}
  />
  <Tab.Screen
    name="in Progress"
    component={ColumnStackNavigator}
    initialParams={{columnId: 2958}}
  />
  <Tab.Screen
    name="testing"
    component={ColumnStackNavigator}
    initialParams={{columnId: 2959}}
  />
  <Tab.Screen
    name="done"
    component={ColumnStackNavigator}
    initialParams={{columnId: 2960}}
  />
</Tab.Navigator>;
