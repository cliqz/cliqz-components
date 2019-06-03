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
  color: string;
  img: any;
  text: string;
}

type LogoColor = string | undefined;

const DEFAULT_STYLE: LogoStyle = {
  borderRadius: 5,
  height: 50,
  width: 50,
};

export class Logo extends React.PureComponent<LogoProps, LogoState> {
  constructor(props: LogoProps) {
    super(props);
    this.state = {
      color: props.logo && this.hexToRgb(props.logo.color) || 'black',
      img: null,
      text: props.logo && props.logo.text || ''
    };
  }

  public componentWillMount() {
    this.getLogo();
  }

  public hexToRgb(color:LogoColor = "") {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : color;
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
    if (logo && logo.url) {
      const image = await this.getImage(logo.url);
      if (image) this.setState({ img: image });
    }
  }

  public render() {
    const { color, img, text } = this.state;
    let logoElement = img ? img : <Text style={{ color: 'white' }}>{text}</Text>;
    return <View
        style={[
          DEFAULT_STYLE,
          this.props.style,
          { backgroundColor: color, justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        {logoElement}
    </View>;
  }
}
