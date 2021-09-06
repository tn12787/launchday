import { extendTheme, theme } from '@chakra-ui/react';

export const appTheme = extendTheme({
  fonts: {
    body: 'InterVariable, Inter, sans-serif',
    heading: 'InterVariable, Inter, sans-serif',
    mono: 'Menlo, Consolas, monospace',
  },
  components: {
    Heading: {
      ...theme.components.Heading,
      sizes: { ...theme.components.Heading.sizes, xl: { fontWeight: 'black' } },
    },
  },

  config: { initialColorMode: 'dark' },
  colors: {
    pink: {
      '50': '#FDE8F2',
      '100': '#F9BEDC',
      '200': '#F594C5',
      '300': '#F16AAE',
      '400': '#ED4098',
      '500': '#E91681',
      '600': '#BA1267',
      '700': '#8C0D4D',
      '800': '#5D0934',
      '900': '#2F041A',
    },
    green: {
      '50': '#ECF8EC',
      '100': '#CBEDCA',
      '200': '#A9E1A8',
      '300': '#87D586',
      '400': '#66C964',
      '500': '#44BD42',
      '600': '#379735',
      '700': '#297227',
      '800': '#1B4C1A',
      '900': '#0E260D',
    },
    teal: {
      '50': '#ECF7F9',
      '100': '#C9E9EE',
      '200': '#A6DBE2',
      '300': '#84CDD7',
      '400': '#61BFCC',
      '500': '#3EB1C1',
      '600': '#328E9A',
      '700': '#256A74',
      '800': '#19474D',
      '900': '#0C2327',
    },
    cyan: {
      '50': '#E5F8FF',
      '100': '#B8EAFF',
      '200': '#8ADDFF',
      '300': '#5CCFFF',
      '400': '#2EC2FF',
      '500': '#00B5FF',
      '600': '#0091CC',
      '700': '#006C99',
      '800': '#004866',
      '900': '#002433',
    },
    purple: {
      '50': '#ECECF9',
      '100': '#CACAED',
      '200': '#A7A7E1',
      '300': '#8585D6',
      '400': '#6363CA',
      '500': '#4040BF',
      '600': '#333399',
      '700': '#272772',
      '800': '#1A1A4C',
      '900': '#0D0D26',
    },
    blue: {
      '50': '#E5F3FF',
      '100': '#B8DCFF',
      '200': '#8AC6FF',
      '300': '#5CB0FF',
      '400': '#2E9AFF',
      '500': '#0084FF',
      '600': '#0069CC',
      '700': '#004F99',
      '800': '#003566',
      '900': '#001A33',
    },
  },
});
