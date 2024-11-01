// App.tsx
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type StatCardProps = {
  title: string;
  value: string;
  subtext: string;
  iconName: any;
  trend: string;
  trendUp?: boolean;
};

// Components
const StatCard = ({ title, value, subtext, iconName, trend, trendUp = true }: StatCardProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[
      styles.card,
      { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
    ]}>
      <View style={styles.cardHeader}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isDarkMode ? '#374151' : '#eff6ff' }
        ]}>
          <Ionicons name={iconName} size={24} color="#3b82f6" />
        </View>
        <View style={[styles.trendContainer, { 
          backgroundColor: trendUp 
            ? (isDarkMode ? '#065f46' : '#dcfce7')
            : (isDarkMode ? '#991b1b' : '#fee2e2')
        }]}>
          <Text style={[styles.trendText, { 
            color: trendUp 
              ? (isDarkMode ? '#34d399' : '#166534')
              : (isDarkMode ? '#fca5a5' : '#991b1b')
          }]}>{trend}</Text>
        </View>
      </View>
      <Text style={[
        styles.cardTitle,
        { color: isDarkMode ? '#9ca3af' : '#6b7280' }
      ]}>{title}</Text>
      <Text style={[
        styles.cardValue,
        { color: isDarkMode ? '#ffffff' : '#1f2937' }
      ]}>{value}</Text>
      <Text style={[
        styles.cardSubtext,
        { color: isDarkMode ? '#9ca3af' : '#6b7280' }
      ]}>{subtext}</Text>
    </View>
  );
};

export default function index() {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const stats = [
    {
      title: "Total Active Users",
      value: "402",
      subtext: "Satdik yang bertransaksi",
      iconName: "people",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Transaction Value",
      value: "Rp 11.784.344.327",
      subtext: "938 Transaksi PBJ per Satdik",
      iconName: "stats-chart",
      trend: "+8.3%",
      trendUp: true
    },
    {
      title: "Average per Provider",
      value: "Rp 1.584.344.327",
      subtext: "327 Transaksi per penyedia",
      iconName: "cart",
      trend: "+5.2%",
      trendUp: true
    }
  ];

  return (
    <SafeAreaView  edges={['right', 'left','top']} style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#111827' : '#f3f4f6' }
    ]} >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={[
          styles.header,
          { backgroundColor: isDarkMode ? '#1f2937' : '#fef3c7' }
        ]}>
          <View>
            <Text style={[
              styles.headerTitle,
              { color: isDarkMode ? '#ffffff' : '#1f2937' }
            ]}>Hai kawan SIPLah!</Text>
            <Text style={[
              styles.headerSubtitle,
              { color: isDarkMode ? '#9ca3af' : '#4b5563' }
            ]}>
              Silahkan memulai aktivitas anda di website SIPLah Mitra
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        <View style={[
          styles.additionalStats,
          { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
        ]}>
          <View style={styles.additionalStatsHeader}>
            <Ionicons 
              name="trending-up" 
              size={24} 
              color="#3b82f6" 
            />
            <Text style={[
              styles.additionalStatsTitle,
              { color: isDarkMode ? '#ffffff' : '#1f2937' }
            ]}>
              Statistik Pengguna Penyedia Barang/Jasa
            </Text>
          </View>
          
          <View style={styles.statsValue}>
            <Text style={[
              styles.largeNumber,
              { color: isDarkMode ? '#ffffff' : '#1f2937' }
            ]}>60,812</Text>
            <Text style={[
              styles.statsLabel,
              { color: isDarkMode ? '#9ca3af' : '#6b7280' }
            ]}>satdik pernah login</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={[
              styles.progressBar,
              { backgroundColor: isDarkMode ? '#374151' : '#dbeafe' }
            ]}>
              <View style={[styles.progressFill, { width: '75%' }]} />
            </View>
            <Text style={[
              styles.progressText,
              { color: isDarkMode ? '#9ca3af' : '#6b7280' }
            ]}>75% Active participation rate</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  yearSelector: {
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
  },
  yearText: {
    fontSize: 14,
    marginRight: 4,
  },
  statsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  trendContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
  },
  additionalStats: {
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  additionalStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  additionalStatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statsValue: {
    marginBottom: 16,
  },
  largeNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
});