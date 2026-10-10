import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export interface NavTab {
  id: string;
  icon: string;
  label: string;
}

interface NavigationBarProps {
  current: string;
  onChange: (v: string) => void;
  tabs: NavTab[];
}

const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  search: 'search',
  camera: 'photo-camera',
  book: 'book',
  info: 'info',
};

export default function NavigationBar({ current, onChange, tabs }: NavigationBarProps) {
  return (
    <View style={styles.bar}>
      {tabs.map((t) => {
        const active = t.id === current;
        return (
          <TouchableOpacity
            key={t.id}
            style={styles.tab}
            onPress={() => onChange(t.id)}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={ICON_MAP[t.icon] ?? 'circle'}
              size={24}
              color={active ? '#a78bfa' : '#475569'}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{t.label}</Text>
            {active && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#0b1526',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139,92,246,0.2)',
    paddingTop: 8,
    paddingBottom: 20,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 4 },
  label: { color: '#475569', fontSize: 11, marginTop: 3, fontWeight: '600' },
  labelActive: { color: '#a78bfa' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#a78bfa', marginTop: 3 },
});
