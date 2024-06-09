import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.filipbli.angular',
  appName: 'fridge-app',
  webDir: 'dist/fridge-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;
/*
url: 'http://192.168.1.8:4200',
cleartext: true
*/