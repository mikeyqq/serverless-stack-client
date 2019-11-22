const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "pocketlist-app-2-api-dev-attachmentsbucket-bqkx60iaf578"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://4vncjqato2.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_mu7TTQVBT",
    APP_CLIENT_ID: "1b9mpov63v145gkg5lkcv6aujh",
    IDENTITY_POOL_ID: "us-east-1:f114bcb4-3a6c-425c-b6e4-77ca28a61637"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "pocketlist-app-2-api-prod-attachmentsbucket-139i182xy5x03"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://1bz0i1dm51.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_tIE445Fqt",
    APP_CLIENT_ID: "56t54b14vpq5qtd63qgff124na",
    IDENTITY_POOL_ID: "us-east-1:001e5bc4-d8ce-4623-87dd-38bcb07882d9"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
