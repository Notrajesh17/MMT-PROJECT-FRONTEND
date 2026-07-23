import { StyleSheet } from 'react-native';

const BORDER_RADIUS = 16;
const CARD_RADIUS = 32;

const COLORS = {
  primary: '#775599',
  primaryLight: '#77559950',
  primaryFade: '#775599aa',
  white: '#fff',
  darkCard: '#1a1a1aee',
  lightCard: '#ffffffee',
  darkBorder: '#555',
  darkText: '#c1c1c1',
  lightPlaceholder: '#77559990',
  darkPlaceholder: '#afafaf',
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '88%',
    padding: 32,
    borderRadius: CARD_RADIUS,
    backgroundColor: COLORS.lightCard,
  },

  cardDark: {
    backgroundColor: COLORS.darkCard,
  },

  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.primary,
  },

  DarkTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.white,
  },

  subtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.primary,
  },

  Darksubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.white,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.primaryLight,
    padding: 14,
    marginBottom: 16,
    color: COLORS.primary,
  },

  inputDark: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.darkBorder,
    padding: 14,
    marginBottom: 16,
    color: COLORS.white,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.primaryLight,
    padding: 4,
    paddingLeft: 10,
    marginBottom: 15,
  },

  passwordContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    borderColor: COLORS.darkBorder,
    padding: 4,
    paddingLeft: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: CARD_RADIUS,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },

  link: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 14,
  },

  linkDark: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.white,
    fontWeight: '600',
    marginTop: 14,
  },

  linkAlt: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.primaryFade,
    textAlign: 'center',
    marginTop: 16,
  },

  linkAltDark: {
    fontFamily: 'Montserrat-Regular',
    color: COLORS.darkText,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default styles;
