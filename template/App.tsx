import { Text, StyleSheet, View, SafeAreaView, StatusBar, Animated, Dimensions, TouchableOpacity } from 'react-native'
import { memo, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { storage, LANGUAGE_KEY } from './src/translations/i18n/i18n'

const { width, height } = Dimensions.get('window')

const PixelBlock = memo(({ size, color, top, left }: { size: number; color: string; top: number; left: number }) => (
  <View style={[styles.pixel, { width: size, height: size, backgroundColor: color, top, left }]} />
))

const App = () => {
  const { t, i18n } = useTranslation()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const pulseAnim = useRef(new Animated.Value(1)).current

  const currentLangLabel = (i18n?.language ?? 'en').toUpperCase()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [fadeAnim, scaleAnim, pulseAnim])

  const handleLanguageChange = useCallback(() => {
    const current = i18n?.language ?? 'en'
    const next = current === 'tr' ? 'en' : 'tr'
    if (i18n?.changeLanguage) i18n.changeLanguage(next)
    storage.set(LANGUAGE_KEY, next)
  }, [i18n])

  const pixelSize = 12
  const gridSpacing = 20

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange} activeOpacity={0.7}>
        <Text style={styles.languageText}>{currentLangLabel}</Text>
      </TouchableOpacity>

      <View style={styles.background}>
        {[...Array(8)].map((_, i) => (
          <PixelBlock
            key={`tl-${i}`}
            size={pixelSize}
            color="#3B82F6"
            top={i * gridSpacing + 40}
            left={i * gridSpacing + 20}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <PixelBlock
            key={`tr-${i}`}
            size={pixelSize}
            color="#8B5CF6"
            top={i * gridSpacing + 60}
            left={width - (i * gridSpacing + 32)}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <PixelBlock
            key={`bl-${i}`}
            size={pixelSize}
            color="#EC4899"
            top={height - (i * gridSpacing + 120)}
            left={i * gridSpacing + 30}
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <PixelBlock
            key={`br-${i}`}
            size={pixelSize}
            color="#10B981"
            top={height - (i * gridSpacing + 80)}
            left={width - (i * gridSpacing + 40)}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        <View style={styles.card}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={styles.iconContainer}>
              <View style={styles.pixelIcon}>
                <View style={[styles.pixelRow, styles.row1]} />
                <View style={[styles.pixelRow, styles.row2]} />
                <View style={[styles.pixelRow, styles.row3]} />
                <View style={[styles.pixelRow, styles.row4]} />
                <View style={[styles.pixelRow, styles.row5]} />
              </View>
            </View>
          </Animated.View>

          <Text style={styles.title}>{t('welcome')}</Text>
          <Text style={styles.subtitle}>{t('boilerplate')}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.features}>
            <View style={styles.feature}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{t('features.typescript')}</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{t('features.state')}</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{t('features.i18n')}</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{t('features.storage')}</Text>
            </View>
            <View style={styles.feature}>
              <View style={styles.dot} />
              <Text style={styles.featureText}>{t('features.structure')}</Text>
            </View>
          </View>

          <View style={styles.versionContainer}>
            <Text style={styles.version}>v0.0.1</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.by}>{t('craftedWith')}</Text>
          <View style={styles.heart}>
            <Text style={styles.heartIcon}>♥</Text>
          </View>
          <Text style={styles.author}>{t('by')} idonidella</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

export default memo(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  languageButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  languageText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#3B82F6',
    letterSpacing: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pixel: {
    position: 'absolute',
    opacity: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  iconContainer: {
    marginBottom: 24,
  },
  pixelIcon: {
    width: 80,
    height: 80,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pixelRow: {
    flexDirection: 'row',
    gap: 4,
  },
  row1: {
    width: 60,
    height: 8,
    backgroundColor: '#3B82F6',
  },
  row2: {
    width: 68,
    height: 8,
    backgroundColor: '#8B5CF6',
  },
  row3: {
    width: 76,
    height: 8,
    backgroundColor: '#EC4899',
  },
  row4: {
    width: 68,
    height: 8,
    backgroundColor: '#10B981',
  },
  row5: {
    width: 60,
    height: 8,
    backgroundColor: '#F59E0B',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#94A3B8',
    marginBottom: 24,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#334155',
    marginBottom: 24,
  },
  features: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  featureText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#CBD5E1',
  },
  versionContainer: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#334155',
    borderRadius: 12,
  },
  version: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    gap: 6,
  },
  by: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  heart: {
    paddingHorizontal: 4,
  },
  heartIcon: {
    fontSize: 16,
    color: '#EF4444',
  },
  author: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
})