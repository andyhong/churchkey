const theme = {
  styles: {
    global: {
      "html": {
        scrollBehavior: "smooth",
        overflowY: "scroll"
      },
      body: {
        minHeight: "100vh",
        bg: "#EEEEEE",
      }
    }
  },
  fonts: {
    heading: `'Inter', -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    body: `'Inter', -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  textStyles: {
    h1: {
      fontSize: "56px",
      fontWeight: "bold",
      letterSpacing: "tighter",
      lineHeight: "100%",
      color: "black"
    },
    h2: {
      fontSize: "48px",
      fontWeight: "medium",
      letterSpacing: "tighter",
      color: "black"
    },
    p: {
      letterSpacing: "tight",
      color: "black"
    },
    sub: {
      letterSpacing: "tight",
      color: "black",
      fontSize: "sm"
    }
  }
}

export default theme
