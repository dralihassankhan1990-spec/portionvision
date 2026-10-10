import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FoodItem } from '../types';

interface BrowseTabProps {
  foods: FoodItem[];
  onSelectFood: (food: FoodItem) => void;
  favorites: Set<string | number>;
  onToggleFavorite: (id: string | number) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Protein: '#f87171',
  Carbs: '#fbbf24',
  Fats: '#fb923c',
  Produce: '#4ade80',
  Sweets: '#f472b6',
  Dairy: '#93c5fd',
  Snacks: '#c084fc',
  Beverages: '#22d3ee',
};

export default function BrowseTab({ foods, onSelectFood, favorites, onToggleFavorite }: BrowseTabProps) {
  const [query, setQuery] = useState('');

  const filtered = foods.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase())
  );

  const renderItem = ({ item }: { item: FoodItem }) => {
    const isFav = favorites.has(item.id);
    return (
      <TouchableOpacity style={styles.card} onPress={() => onSelectFood(item)} activeOpacity={0.7}>
        <View style={[styles.badge, { backgroundColor: CATEGORY_COLORS[item.category] ?? '#8b5cf6' }]}>
          <Text style={styles.badgeText}>{item.category.charAt(0)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        {item.portionSize ? <Text style={styles.portion}>{item.portionSize}</Text> : null}
        {item.visualReference ? (
          <View style={styles.refPill}>
            <Text style={styles.refText} numberOfLines={1}>{item.visualReference}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => onToggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.favStar, isFav && styles.favStarActive]}>{isFav ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search foods or categories…"
        placeholderTextColor="#64748b"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No foods match “{query}”.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071024' },
  search: {
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#0f1d33',
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    margin: 6,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#0f1d33',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.18)',
    minHeight: 150,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  badgeText: { color: '#071024', fontWeight: '800', fontSize: 14 },
  name: { color: '#fff', fontWeight: '700', fontSize: 14, lineHeight: 18 },
  portion: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  refPill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59,130,246,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  refText: { color: '#93c5fd', fontSize: 10, fontWeight: '600' },
  favBtn: { position: 'absolute', top: 8, right: 8, padding: 4 },
  favStar: { fontSize: 20, color: '#475569' },
  favStarActive: { color: '#fbbf24' },
  empty: { color: '#64748b', textAlign: 'center', marginTop: 40 },
});
