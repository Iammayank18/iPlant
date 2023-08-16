// import { applyMiddleware, compose } from "redux";
// import { legacy_createStore as createStore } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import rootSagas from "./RootSagas";
// import { rootReducer } from "./RootReducer";

// const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   //   whitelist: ["user"],
// };

// // export default function configureStore() {
// // const middlewareEnhancer = applyMiddleware(sagaMiddleware);

// // const composedEnhancers = compose(middlewareEnhancer);
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // const store = createStore(persistedReducer, undefined, composedEnhancers);

// // const composeEnhancers =
// //   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
// //         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
// //       })
// //     : compose;

// // const enhancer = composeEnhancers(
// //   applyMiddleware(sagaMiddleware)
// //   // other store enhancers if any
// // );
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// let persistor = persistStore(store);
// sagaMiddleware.run(rootSagas);
// export { store, persistor };
// //

const COMMENT_DATA = [
  {
    name: "Reboot 1",
    des: "sdfsduhf sdfsdo fsdfuihdsf sdiufhsdiuf ds fdsiufhdsiuf dsiufsdf sdiu ",
    direction: "Carrer de Pujades, 100",
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.451WeyQeVimR0oSiaiqwsgHaHa%26pid%3DApi&f=1&ipt=475d755d8def30c8bfb90a7a2cb6e70372f267640915053fcad7ac4bd9b8ea0b&ipo=images",
  },
  {
    name: "Reboot 2",
    des: "sdfsduhf sdfsdo fsdfuihdsf sdiufhsdiuf ds fdsiufhdsiuf dsiufsdf sdiu ",
    direction: "Carrer de Pujades, 100",
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.451WeyQeVimR0oSiaiqwsgHaHa%26pid%3DApi&f=1&ipt=475d755d8def30c8bfb90a7a2cb6e70372f267640915053fcad7ac4bd9b8ea0b&ipo=images",
  },
  {
    name: "Reboot 3",
    des: "sdfsduhf sdfsdo fsdfuihdsf sdiufhsdiuf ds fdsiufhdsiuf dsiufsdf sdiu ",
    direction: "Carrer de Pujades, 100",
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.451WeyQeVimR0oSiaiqwsgHaHa%26pid%3DApi&f=1&ipt=475d755d8def30c8bfb90a7a2cb6e70372f267640915053fcad7ac4bd9b8ea0b&ipo=images",
  },
  {
    name: "Reboot 4",
    des: "sdfsduhf sdfsdo fsdfuihdsf sdiufhsdiuf ds fdsiufhdsiuf dsiufsdf sdiu ",
    direction: "Carrer de Pujades, 100",
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.451WeyQeVimR0oSiaiqwsgHaHa%26pid%3DApi&f=1&ipt=475d755d8def30c8bfb90a7a2cb6e70372f267640915053fcad7ac4bd9b8ea0b&ipo=images",
  },
  {
    name: "Reboot 5",
    des: "sdfsduhf sdfsdo fsdfuihdsf sdiufhsdiuf ds fdsiufhdsiuf dsiufsdf sdiu ",
    direction: "Carrer de Pujades, 100",
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.451WeyQeVimR0oSiaiqwsgHaHa%26pid%3DApi&f=1&ipt=475d755d8def30c8bfb90a7a2cb6e70372f267640915053fcad7ac4bd9b8ea0b&ipo=images",
  },
];

{
  /* <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            w={["500", "300"]}
            h="80"
          >
            {allschools?.length > 0 ? (
              allschools?.map((data, i) => {
                return (
                  <RecentCard
                    key={i}
                    institute={data?.school_name}
                    location={data?.city}
                    rating={data?.rating}
                    getSchoolDetails={() =>
                      getSchools(data.location, data.school_name, data._id)
                    }
                  />
                );
              })
            ) : (
              <SkeletonComp />
            )}
          </ScrollView> */
}

{
  /* <VStack>
            <Text>Top schools in your city</Text>
            <Stack style={{ marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                w={["500", "300"]}
                h="80"
              >
                {cardData?.length > 0 ? (
                  cardData?.map((data, i) => {
                    return (
                      <RecentCard
                        key={i}
                        institute={data.sname}
                        location={data.loc}
                        rating={data.rating}
                        getSchoolDetails={() => {
                          navigation.navigate("SchoolDetails", {
                            name: "ssra",
                            id: Math.random() * 100,
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <SkeletonComp />
                )}
              </ScrollView>
            </Stack>
          </VStack>

          <VStack>
            <Text>Top schools in your locality</Text>
            <Stack style={{ marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                w={["500", "300"]}
                h="80"
              >
                {cardData?.length > 0 ? (
                  cardData?.map((data, i) => {
                    return (
                      <RecentCard
                        key={i}
                        institute={data.sname}
                        location={data.loc}
                        rating={data.rating}
                        getSchoolDetails={() => {
                          navigation.navigate("SchoolDetails", {
                            name: "ssra",
                            id: Math.random() * 100,
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <SkeletonComp />
                )}
              </ScrollView>
            </Stack>
          </VStack>

          <VStack>
            <Text>Top schools in your state</Text>
            <Stack style={{ marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                w={["500", "300"]}
                h="80"
              >
                {cardData?.length > 0 ? (
                  cardData?.map((data, i) => {
                    return (
                      <RecentCard
                        key={i}
                        institute={data.sname}
                        location={data.loc}
                        rating={data.rating}
                        getSchoolDetails={() => {
                          navigation.navigate("SchoolDetails", {
                            name: "ssra",
                            id: Math.random() * 100,
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <SkeletonComp />
                )}
              </ScrollView>
            </Stack>
          </VStack>

          <VStack>
            <Text>Top schools in your state</Text>
            <Stack style={{ marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                w={["500", "300"]}
                h="80"
              >
                {cardData?.length > 0 ? (
                  cardData?.map((data, i) => {
                    return (
                      <RecentCard
                        key={i}
                        institute={data.sname}
                        location={data.loc}
                        rating={data.rating}
                        getSchoolDetails={() => {
                          navigation.navigate("SchoolDetails", {
                            name: "ssra",
                            id: Math.random() * 100,
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <SkeletonComp />
                )}
              </ScrollView>
            </Stack>
          </VStack> */
}

{
  /* {!allschoolsLoader && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={allschoolsLoader}
              onRefresh={onRefresh}
            />
          }
          data={allschools}
          renderItem={renderItem}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          keyExtractor={(item) => item._id}
          horizontal
        />
      )} */
}

////////////////////////
{
  /* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
          marginTop: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={searchSchoolLoader}
            onRefresh={onRefresh}
          />
        }
      >
        <View>
          {searchSchools?.length >= 0 &&
            searchSchools?.map((data, i) => (
              <Stack key={i} style={{ marginBottom: 10 }}>
                <SchoolCard
                  key={i}
                  institute={data?.schoolname}
                  location={data?.city}
                  rating={data?.rating}
                  getSchoolDetails={() =>
                    getSchools(data.location, data.name, data._id)
                  }
                  imagewidth={width - 50}
                />
              </Stack>
            ))}
        </View>
      </ScrollView> */
}
