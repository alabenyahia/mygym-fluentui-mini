import {
  createLightTheme,
  createDarkTheme,
  Theme,
  BrandVariants,
} from "@fluentui/react-components";

const mygymTheme: BrandVariants = {
  10: "#00030A",
  20: "#001833",
  30: "#0A2647",
  40: "#1A3254",
  50: "#293E60",
  60: "#374A6C",
  70: "#455779",
  80: "#546485",
  90: "#637291",
  100: "#72809D",
  110: "#818EA9",
  120: "#919CB5",
  130: "#A1AAC0",
  140: "#B1B9CC",
  150: "#C2C8D7",
  160: "#D3D7E3",
};

export const lightTheme: Theme = {
  ...createLightTheme(mygymTheme),
};

export const darkTheme: Theme = {
  ...createDarkTheme(mygymTheme),
};

darkTheme.colorBrandForeground1 = mygymTheme[110];
darkTheme.colorBrandForeground2 = mygymTheme[120];
