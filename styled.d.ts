import "styled-components";

declare module "styled-components/native" {
  export interface DefaultTheme {
    BgColor: string;
    textColor: string;
  }
}
