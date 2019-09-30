import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';
import CustomHeader from "../components/CustomHeader";
import UserData from "../components/UserData";
import fstyles from "../styles";

const API = 'http://local.appcms.com//jsonapi/node/flats?filter[title-filter][condition][path]=title&filter[title-filter][condition][operator]=CONTAINS&filter[title-filter][condition][value]=';
class AutocompleteExample extends Component {
  constructor(props) {
    super(props);
    //Initialization of state
    this.state = {
      flats: [],
      query: '',
      transItem: '',
      auth_token: ''
    };
  }
  componentDidMount() {
    //Fetch the data from the server for the suggestion
    fetch(`${API}`)
      .then(res => res.json())
      .then(json => {
        const { data: flats } = json;
        this.setState({ flats });
        //setting the data in the flats state
      });
  }

  fetchUserData = async () => {
    // this.removeItemValue('currentuserinfo');
    try {
      let userinfo = await AsyncStorage.getItem('currentuserinfo');

      if (userinfo === null) {
        this.state.auth_token = '';
      }
      else {
        //userinfo = JSON.parse(userinfo);
        this.parseUserData(userinfo);
      }
    } catch (error) {
      console.log('Error fetching user data', error);
    }
  }

  parseUserData = (userinfo) => {
    let info = JSON.parse(userinfo);
    this.setState({ auth_token: info.csrf_token });
  };

  // Search for records.
  findFlats(query) {
    //method called everytime when we change the value of the input
    if (query === '') {
      //if the query is null then return blank
      return [];
    }

    const { flats } = this.state;
    console.log(this.state.flats[0].attributes.title)
    console.log(query)
    //making a case insensitive regular expression to get similar value from the flat json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered flat array according the query from the input
    return flats.filter(flat => flat.attributes.title.search(regex) >= 0);
  }

  // Selected item id.
  setFlatSelected(item) {
    this.setState({ query: item.attributes.title })
    this.setState({ transItem: item.id })
  }

  SaveData = async () => {
    var title = this.state.query + ' - ' +this.state.startdate;
    console.log('In SaveData');
    fetch('http://local.appcms.com/jsonapi/node/transaction', {
          method: 'post',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            "Accept": 'application/vnd.api+json',
            "X-CSRF-Token": this.state.auth_token,
            'Authorization': 'Basic ' + 'am9uOjEyMzEyMw=='
          },
          body: JSON.stringify({
            "data": {
              "type": "node--transaction",
              "attributes": {
                "title": title,
                "field_months": {
                  "value": this.state.startdate,
                  "end_value": this.state.enddate
                }
              },
              "relationships": {
                "field_flat": {
                  "data": {
                    "type": "node--flats",
                    "id": this.state.transItem
                  }
                }
              }
            }
          })
        }).then((response) => response.json())
          .then((res) => {
            if(typeof(res.message) != "undefined"){
              Alert.alert("Error", "Error: "+ res.message);
            }
            else {
              console.log(res)
              console.log(title)
              console.log(this.state.enddate)
              console.log(this.state.transItem.id)

            }
          }).catch((error) => {
            console.error(error);
          });
  }

  render() {
    const { query } = this.state;
    //console.log('in renderr')
    console.log(query)
    const flats = this.findFlats(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.MainContainer}>
        <CustomHeader navigation={this.props.navigation} />
        <Text style={fstyles.pagetitle}>Maintenance</Text>
        <UserData/>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={flats.length === 1 && comp(query, flats[0].attributes.title) ? [] : flats}
          //default value if you want to set something in input
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter flat number"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>
              this.setFlatSelected(item)
            }>
              <Text style={styles.itemText}>
                {item.attributes.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {flats.length > 0 ? (
            <Text style={styles.infoText}>{this.state.query}</Text>
          ) : (
            <Text style={styles.infoText}>Enter The Flat Title</Text>
          )}
        </View>
        <View style={styles.dateContainer}>
          <DatePicker
            style={{width: 200, marginTop: 70}}
            date={this.state.curDate}
            mode="date"
            placeholder="From month"
            format="YYYY-MM-DD"
            minDate={this.state.startdate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                backgroundColor: "#FFFFFF"
              }
            }}
            onDateChange={(startdate) => {this.setState({startdate: startdate})}}
          />

          <DatePicker
            style={{width: 200}}
            date={this.state.curDate}
            mode="date"
            placeholder="Till month"
            format="YYYY-MM-DD"
            minDate={this.state.date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 20,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                marginTop: 30,
                backgroundColor: "#FFFFFF"
              }
            }}
            onDateChange={(enddate) => {this.setState({enddate: enddate})}}
          />
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.button} onPress={this.SaveData.bind(this)}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    margin: 20,
    padding:6
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateContainer: {
    alignItems: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
  button : {
    backgroundColor: "#eb3700",
    borderRadius: 25,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 13,
    width: 300,
    marginTop: 200,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: "#efebe9",
    textAlign: "center",
  }
});
export default AutocompleteExample;