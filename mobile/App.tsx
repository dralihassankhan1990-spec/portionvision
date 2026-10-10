import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import BrowseTab from './src/components/BrowseTab';
import CameraOverlay from './src/components/CameraOverlay';
import ComparisonModal from './src/components/ComparisonModal';
import MyPortionsTab from './src/components/MyPortionsTab';
import NavigationBar from './src/components/NavigationBar';
import { FOOD_DATA } from './src/constants';
import { FoodItem, LogEntry, VisualObject } from './src/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutTab from './src/components/AboutTab';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Tab = 'browse' | 'camera' | 'myportions' | 'about';

const FAVORITES_KEY = 'pv_favorites_v1';
const LOGS_KEY = 'pv_logs_v1';

export default function App() {
  const [tab, setTab] = useState<Tab>('browse');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cameraVisual, setCameraVisual] = useState<VisualObject | null>(null);


  useEffect(() => {
  (async () => {
    if (Platform.OS === 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })();
}, []);

  useEffect(() => {
    // load favorites and logs
    (async () => {
      try {
        const favRaw = await AsyncStorage.getItem(FAVORITES_KEY);
        if (favRaw) setFavorites(new Set(JSON.parse(favRaw)));
        const logsRaw = await AsyncStorage.getItem(LOGS_KEY);
        if (logsRaw) setLogs(JSON.parse(logsRaw));
      } catch (err) {
        console.warn('Load storage failed', err);
      }
    })();
  }, []);

  const persistFavorites = async (set: Set<string | number>) => {
    try { await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(set))); } catch (e) { console.warn(e); }
  };

  const persistLogs = async (items: LogEntry[]) => {
    try { await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(items)); } catch (e) { console.warn(e); }
  };

  const toggleFavorite = (id: string | number) => {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id); else next.add(id);
    setFavorites(next);
    persistFavorites(next);
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setModalVisible(true);
  };

  const openCameraFor = (visualObject: VisualObject | null) => {
    setCameraVisual(visualObject);
    setTab('camera');
    setModalVisible(false);
  };

  const handleCapture = (uri: string | null) => {
    if (uri && selectedFood && cameraVisual) {
      const entry: LogEntry = {
        id: String(Date.now()),
        timestamp: Date.now(),
        foodName: selectedFood.name,
        objectName: cameraVisual.name,
        emoji: cameraVisual.emoji || '📷',
        calories: selectedFood.calories,
        category: selectedFood.category
      };
      const next = [entry, ...logs];
      setLogs(next);
      persistLogs(next);
      Alert.alert('Logged', `${selectedFood.name} added to your log.`);
    } else if (uri) {
      Alert.alert('Captured', 'Photo saved.');
    }
    // return to browse
    setTab('browse');
  };

  const handleClearLogs = () => {
    setLogs([]);
    persistLogs([]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>PortionVision</Text>
      </View>

      <View style={styles.content}>
        {tab === 'browse' && (
          <BrowseTab foods={FOOD_DATA} onSelectFood={handleSelectFood} favorites={favorites} onToggleFavorite={toggleFavorite} />
        )}

        {tab === 'camera' && (
          <CameraOverlay
            onCapture={handleCapture}
            onClose={() => setTab('browse')}
            visualObject={selectedFood?.visualReference || 'circle'}
          />
        )}

        {tab === 'myportions' && (
          <MyPortionsTab logs={logs} onClear={handleClearLogs} />
        )}

        {tab === 'about' && (
          <AboutTab />
        )}
      </View>

      {/* <NavigationBar current={tab} onChange={(v) => setTab(v as Tab)} /> */}
      <NavigationBar
        current={tab}
        onChange={(v) => setTab(v as Tab)}
        tabs={[
          { id: 'browse', icon: 'search', label: 'Browse' },
          { id: 'camera', icon: 'camera', label: 'Camera' },
          { id: 'myportions', icon: 'book', label: 'My Portions' },
          { id: 'about', icon: 'info', label: 'About' }
        ]}
      />
      <ComparisonModal visible={modalVisible} food={selectedFood} onClose={() => setModalVisible(false)} onOpenCamera={openCameraFor} onToggleFavorite={toggleFavorite} isFavorite={selectedFood ? favorites.has(selectedFood.id) : false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#071024' },
  header: { padding: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)', backgroundColor: '#071024', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontWeight: '800', fontSize: 18 },
  content: { flex: 1, paddingBottom: 84 }
});
