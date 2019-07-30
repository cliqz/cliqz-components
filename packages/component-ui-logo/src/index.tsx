import React from 'react';
import { Image, Text, View } from 'react-native';

interface LogoDetails {
  color?: string;
  text?: string;
  url?: string;
}

type LogoProp = LogoDetails | null;

interface LogoProps {
  logo: LogoProp;
  size: number;
  logoSize?: number;
  fontSize?: number;
  borderRadius?: number;
}

interface LogoState {
  color: string;
  img: any;
  text: string;
}

type LogoColor = string | undefined;

const DEFAULT_FONT_SIZE = 12;

export class Logo extends React.PureComponent<LogoProps, LogoState> {
  constructor(props: LogoProps) {
    super(props);
    this.state = {
      color: (props.logo && this.hexToRgb(props.logo.color)) || 'black',
      img: null,
      text: (props.logo && props.logo.text) || '',
    };
  }

  public componentWillMount() {
    this.getLogo();
  }

  public hexToRgb(color: LogoColor = '') {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result
      ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
          result[3],
          16,
        )})`
      : color;
  }

  public async getImage(url: string) {
    await Image.prefetch(url);
    const size = this.props.logoSize || this.props.size;
    return (
      <Image source={{ uri: url }} style={{ height: size, width: size }} />
    );
  }

  public async getLogo() {
    const { logo } = this.props;
    if (logo && logo.url) {
      const image = await this.getImage(logo.url);
      if (image) {
        this.setState({ img: image });
      }
    }
  }

  public render() {
    const { color, img, text } = this.state;
    const fontSize = this.props.fontSize || DEFAULT_FONT_SIZE;
    const style = {
      borderRadius: this.props.borderRadius || 0,
      height: this.props.size,
      width: this.props.size,
    };

    const logoElement = img ? (
      img
    ) : (
      <Text style={{ color: 'white', fontSize }}>{text}</Text>
    );
    return (
      <View
        style={[
          style,
          {
            alignItems: 'center',
            backgroundColor: color,
            justifyContent: 'center',
            overflow: 'hidden',
          },
        ]}
      >
        {logoElement}
      </View>
    );
  }
}
