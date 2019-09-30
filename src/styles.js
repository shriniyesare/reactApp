
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    height: 70,
    paddingTop: 30,
    paddingLeft: 5,
    flexDirection: 'row'
  },
  cdncontainer: {
    flex: 1,
    paddingTop: 50
  },
  icons: {
    width: 30
  },
  pagetitle: {
    fontSize: 24,
    fontWeight: '500',
    color: "#efebe9",
    backgroundColor: "#e06314",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  notetitle: {
    fontSize: 16,
    backgroundColor: "#bec5d1",
    color: "#3a3a3d",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  notecontent: {
    fontSize: 14,
    backgroundColor: "#f5f7ff",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "#ffffff",
    marginBottom: 2
  },
  transdata: {
    fontSize: 18,
    backgroundColor: "#fae1c8",
    paddingTop: 55,
    paddingBottom: 55,
    paddingLeft: 15,
    borderBottomColor: "#ffffff",
    marginBottom: 5
  },
  transdataovd: {
    fontSize: 18,
    backgroundColor: "#ffde8c",
    paddingTop: 55,
    paddingBottom: 55,
    paddingLeft: 15,
    borderBottomColor: "#ffffff",
    marginBottom: 5
  }
});

export default styles;