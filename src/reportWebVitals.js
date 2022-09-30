const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

/* {"user":{
  "userName": "values.userName",
"password": "values.password",
"email": "laura@gmail.com",
"teamID":"f50a5a34-60b6-46b5-8e33-d5d626516103",
    "role": "Team Member",
          "continent": "America",
          "region": "Latam"
  
}} */