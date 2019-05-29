import React from 'react';
import { Image, Text, View } from 'react-native';

interface LogoDetails {
  backgroundColor: string;
  backgroundImage?: string;
  text: string;
}

interface UrlDetails {
  domain: string;
}

interface LogoStyle {
  height: number;
  width: number;
  borderRadius?: number;
}

interface LogoProps {
  url: string;
  style?: LogoStyle;
  getUrlDetails(url: string): UrlDetails;
  getLogoDetails(domain: string): LogoDetails;
}

interface LogoState {
  img: any;
}

const DEFAULT_STYLE: LogoStyle = {
  borderRadius: 5,
  height: 50,
  width: 50,
};

export class Logo extends React.PureComponent<LogoProps, LogoState> {
  public componentWillMount() {
    this.getLogo();
  }

  public getDefaultLogo({ backgroundColor, text }: LogoDetails) {
    return (
      <View
        style={[
          DEFAULT_STYLE,
          this.props.style,
          { backgroundColor, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ color: 'white' }}>{text}</Text>
      </View>
    );
  }

  public getImage(backgroundImage: string) {
    return (
      <Image
        source={{ uri: backgroundImage }}
        style={[DEFAULT_STYLE, this.props.style]}
      />
    );
  }

  public async getLogo() {
    const { url, getUrlDetails, getLogoDetails } = this.props;
    const { domain } = getUrlDetails(url);
    const logo = getLogoDetails(domain);
    this.setState({ img: this.getDefaultLogo(logo) });
    if (logo.backgroundImage) {
      await Image.prefetch(logo.backgroundImage);
      this.setState({ img: this.getImage(logo.backgroundImage) });
    }
  }

  public render() {
    return this.state.img;
  }
}
