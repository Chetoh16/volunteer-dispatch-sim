// src/react-simple-maps.d.ts
declare module "react-simple-maps" {
  import * as React from "react";

  type GeographyProps = React.SVGProps<SVGPathElement> & {
    geography?: any;
    key?: string | number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  };

  type GeographiesProps = {
    geography: string | any;
    children: (props: { geographies: any[] }) => React.ReactNode;
  };

  export const ComposableMap: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}