import React from 'react';
import { Image, Text, View } from 'react-native';

interface LogoDetails {
  color?: string;
  text?: string;
  url?: string;
}

type LogoProp = LogoDetails | null;


interface LogoStyle {
  height: number;
  width: number;
  borderRadius?: number;
}

interface LogoProps {
  logo: LogoProp;
  style?: LogoStyle;
}

interface LogoState {
  img: any;
}

type LogoColor = string;

const DEFAULT_STYLE: LogoStyle = {
  borderRadius: 5,
  height: 50,
  width: 50,
};

export class Logo extends React.PureComponent<LogoProps, LogoState> {
  constructor(props: LogoProps) {
    super(props);
    this.state = {
      img: this.getDefaultLogo(props.logo),
    };
  }

  public componentWillMount() {
    this.getLogo();
  }

  public hexToRgb(color:LogoColor) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : color;
  }

  public getDefaultLogo(logo: LogoProp) {
    let backgroundColor = 'black';
    let text = '';
    if (logo && logo.color) {
      backgroundColor = logo.color;
    }
    if (logo && logo.text) {
      text = logo.text;
    }
    // View do not accepts hexcodes
    backgroundColor = this.hexToRgb(backgroundColor)

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

  public async getImage(url: string) {
    await Image.prefetch(url);
    return (
      <Image
        source={{ uri: url }}
        style={[DEFAULT_STYLE, this.props.style]}
      />
    );
  }

  public async getLogo() {
    const { logo } = this.props;
    if (!logo) return;
    if (logo.url) {
      this.setState({ img: await this.getImage(logo.url) });
    }
  }

  public render() {
    return this.state.img;
  }
}
