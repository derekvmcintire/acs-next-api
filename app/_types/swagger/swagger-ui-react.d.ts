declare module "swagger-ui-react" {
  import { FC } from "react";

  interface SwaggerUIProps {
    url?: string;
    swaggerDoc?: object;
    presets?: (typeof SwaggerUIStandalonePreset)[];
  }

  export const SwaggerUI: FC<SwaggerUIProps>;
  export default SwaggerUI;
}
