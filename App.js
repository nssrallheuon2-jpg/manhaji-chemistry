import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// ==================== بيانات الكيمياء ====================
const CHEMISTRY_DATA = {
  subjectName: 'الكيمياء',
  subjectColor: '#7B1FA2',
  units: [
    { id: 1, title: 'العناصر الانتقالية', startPage: 11, endPage: 21 },
    { id: 2, title: 'الطاقة الحرارية', startPage: 22, endPage: 41 },
    { id: 3, title: 'الطاقة الكهربائية', startPage: 42, endPage: 68 },
    { id: 4, title: 'الطاقة النووية', startPage: 69, endPage: 90 },
    { id: 5, title: 'مركبات النيتروجين', startPage: 91, endPage: 103 },
    { id: 6, title: 'الكيمياء الحيوية', startPage: 104, endPage: 122 },
    { id: 7, title: 'الذهب الأسود', startPage: 123, endPage: 137 },
    { id: 8, title: 'صناعات كيميائية', startPage: 138, endPage: 166 },
    { id: 9, title: 'الكيمياء والبيئة', startPage: 167, endPage: 184 },
  ]
};

// ==================== المكون الرئيسي ====================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const theme = {
    bg: isDark ? '#1A120B' : '#FAF3E0',
    card: isDark ? '#2A221B' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSec: isDark ? '#AAAAAA' : '#666666',
    primary: CHEMISTRY_DATA.subjectColor,
  };

  // 🏠 الشاشة الرئيسية
  const HomeScreen = () => (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* الهيدر */}
      <LinearGradient
        colors={[theme.primary, '#9C27B0']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="flask" size={50} color="#FFFFFF" />
        <Text style={styles.headerTitle}>الكيمياء</Text>
        <Text style={styles.headerSubtitle}>الصف الثالث الثانوي</Text>
      </LinearGradient>

      {/* قائمة الوحدات */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>الوحدات الدراسية</Text>
        
        {CHEMISTRY_DATA.units.map((unit) => (
          <TouchableOpacity
            key={unit.id}
            style={[styles.unitCard, { backgroundColor: theme.card }]}
            onPress={() => {
              setSelectedUnit(unit);
              setCurrentScreen('units');
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.unitIcon, { backgroundColor: `${theme.primary}20` }]}>
              <Ionicons name="book" size={28} color={theme.primary} />
            </View>
            <View style={styles.unitInfo}>
              <Text style={[styles.unitTitle, { color: theme.text }]}>
                الوحدة {unit.id}: {unit.title}
              </Text>
              <Text style={styles.unitPages}>
                الصفحات {unit.startPage} - {unit.endPage}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSec} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  // 📚 شاشة الوحدات
  const UnitsScreen = () => (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* الهيدر */}
      <View style={[styles.unitHeader, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.unitHeaderTitle, { color: theme.text }]}>
          الوحدة {selectedUnit?.id}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.unitDetails, { backgroundColor: theme.card }]}>
          <Text style={[styles.unitNameLarge, { color: theme.text }]}>
            {selectedUnit?.title}
          </Text>
          <Text style={styles.unitPagesLarge}>
            الصفحات {selectedUnit?.startPage} - {selectedUnit?.endPage}
          </Text>
        </View>

        {/* الدروس */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>الدروس</Text>
        
        <View style={styles.lessonsGrid}>
          {[1, 2, 3].map((lessonNum) => (
            <TouchableOpacity
              key={lessonNum}
              style={[styles.lessonCard, { backgroundColor: theme.card }]}
              onPress={() => {
                Alert.alert(
                  `الدرس ${lessonNum}`,
                  `صفحة ${selectedUnit?.startPage + lessonNum - 1}`,
                  [{ text: 'حسناً' }]
                );
              }}
            >
              <Ionicons name="play-circle" size={40} color={theme.primary} />
              <Text style={[styles.lessonTitle, { color: theme.text }]}>الدرس {lessonNum}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* زر الكتاب */}
        <TouchableOpacity
          style={[styles.fullBookButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            Alert.alert(
              'الكتاب المدرسي',
              `سيفتح من صفحة ${selectedUnit?.startPage}`,
              [{ text: 'حسناً' }]
            );
          }}
        >
          <Ionicons name="book" size={24} color="#FFFFFF" />
          <Text style={styles.fullBookText}>فتح الكتاب - صفحة {selectedUnit?.startPage}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // ==================== العرض ====================
  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'units' && <UnitsScreen />}
    </View>
  );
}

// ==================== الأنماط ====================
const styles = StyleSheet.create({
  container: { flex: 1 },
  
  // Home
  header: {
    alignItems: 'center',
    padding: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
  unitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  unitIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitInfo: {
    flex: 1,
    marginLeft: 15,
  },
  unitTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unitPages: {
    fontSize: 12,
    color: '#666',
  },

  // Units
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 10,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  unitDetails: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  unitNameLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  unitPagesLarge: {
    fontSize: 14,
    color: '#666',
  },
  lessonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 10,
  },
  lessonCard: {
    width: (Dimensions.get('window').width - 40) / 3,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fullBookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    gap: 10,
  },
  fullBookText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});