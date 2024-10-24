import React, {Fragment} from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {
  Platform,
  Pressable,
  SafeAreaView,
  // StatusBar,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
// console.log('MAPLibre', MapLibreGL.setConnected);
if (Platform.OS === 'android') {
  // MapLibreGL.setAccessToken(null);
  // MapLibreGL.setConnected(true);
}

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const laurentidesCities = [
  {
    name: 'rabaischocs - Saint-Jérôme',
    slug: 'saint-jerome',
    coordinates: [-74.0192, 45.7805],
  },
  {
    name: 'rabaischocs - Mont-Tremblant',
    slug: 'mont-tremblant',
    coordinates: [-74.5841, 46.1186],
  },
  {
    name: 'rabaischocs - Blainville',
    slug: 'blainville',
    coordinates: [-73.8849, 45.6736],
  },
  {
    name: 'rabaischocs - Sainte-Agathe-des-Monts',
    slug: 'sainte-agathe-des-monts',
    coordinates: [-74.2822, 46.0483],
  },
  {
    name: 'rabaischocs - Saint-Eustache',
    slug: 'saint-eustache',
    coordinates: [-73.9024, 45.5581],
  },
  {
    name: 'rabaischocs - Lachute',
    slug: 'lachute',
    coordinates: [-74.3245, 45.6507],
  },
  {
    name: 'rabaischocs - Mirabel',
    slug: 'mirabel',
    coordinates: [-74.0774, 45.6518],
  },
  {
    name: 'rabaischocs - Sainte-Adèle',
    slug: 'sainte-adele',
    coordinates: [-74.1345, 45.9519],
  },
  {
    name: 'rabaischocs - Boisbriand',
    slug: 'boisbriand',
    coordinates: [-73.8364, 45.6107],
  },
  {
    name: 'rabaischocs - Deux-Montagnes',
    slug: 'deux-montagnes',
    coordinates: [-73.8921, 45.5339],
  },
];

const Marker = (props: any) => {
  // console.log('props', props);
  const visibility = {
    opacity: props.isSelected ? 1 : 0,
    disply: props.isSelected ? 'flex' : 'none',
  };

  return (
    <Pressable onPress={props?.updateCurrentCoordinates} style={styles.marker}>
      <View style={[styles.markerHeader, visibility]}>
        <Text>Séléctionner</Text>
        <Text style={{color: '#000'}}>{props.city.name}</Text>
      </View>
      <Icon name="map-marker" size={50} color="#900" />
    </Pressable>
  );
};

function App(): React.JSX.Element {
  const [currentPosition, setCurrentPosition] = React.useState<
    [number, number]
  >([-73.9024, 45.5581]);

  return (
    <SafeAreaView style={styles.page}>
      <Text>Map libre !!</Text>

      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL="https://tiles.openfreemap.org/styles/liberty">
        <MapLibreGL.Camera
          zoomLevel={14}
          pitch={50}
          centerCoordinate={currentPosition}
        />

        {laurentidesCities.map((city, i) => {
          const updateCurrentCoordinates = () =>
            setCurrentPosition(city.coordinates);

          const isSelected = currentPosition.every(
            (c, i) => c === city.coordinates[i],
          );

          return (
            <MapLibreGL.MarkerView
              id={city.slug}
              key={i + city.slug + city.coordinates[0]}
              coordinate={city.coordinates}
              children={
                <Marker
                  city={city}
                  updateCurrentCoordinates={updateCurrentCoordinates}
                  isSelected={isSelected}
                />
              }
            />
          );
        })}
      </MapLibreGL.MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    // width: '100%',
    alignSelf: 'stretch',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerHeader: {
    maxWidth: 175,
    padding: 6,
    borderRadius: 4,
    borderColor: 'rgb(255, 0, 0)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

export default App;
