//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import all basic components
import AsyncStorage from '@react-native-community/async-storage';
import CustomHeader from "../components/CustomHeader";

export default class Screen1 extends Component {

  removeUserData = async () => {
    try {
      console.log("In remove user data.")
      await AsyncStorage.removeItem('currentuserinfo');
    }
    catch(error) {
      console.error(error);
    }
  }

  Logout = async () => {
    console.log('In logout click');
    this.removeUserData();
    console.log(this.state)
    fetch('http://local.appcms.com/user/logout?_format=json&csrf_token=aFiLgrHxL4O1fdPND4HfAps_8drxwq0X1LTe4p7x1lQ', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response))
          .then((response) => {

          }).catch((error) => {
            console.error(error);
          });
  }

  //Screen3 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        <CustomHeader navigation={this.props.navigation} />
        <Text style={{ fontSize: 23 }}> Screen 1 </Text>
        <TouchableOpacity onPress={this.Logout.bind(this)}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    //alignItems: 'center',
    marginTop: 10,
    //justifyContent: 'center',
  },
});


/*
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DatePicker from 'react-native-datepicker';
import Autocomplete from 'react-native-autocomplete-input';

import CustomHeader from "../components/CustomHeader";
import UserData from "../components/UserData";
import fstyles from "../styles";

const API = 'https://swapi.co/api';
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default class Maintenance extends Component {

  static renderFilm(film) {
    const { title, director, opening_crawl, episode_id } = film;
    const roman = episode_id < ROMAN.length ? ROMAN[episode_id] : episode_id;

    return (
      <View>
        <Text style={styles.titleText}>{roman}. {title}</Text>
        <Text style={styles.directorText}>({director})</Text>
        <Text style={styles.openingText}>{opening_crawl}</Text>
      </View>
    );
  }

  constructor(props){
    super(props)
    this.state = {
      startdate:"2016-05-15",
      curDate: '',
      enddate: '',
      films: [],
      query: ''
    }
  }

  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    that.setState({
      //Setting the value of the date time
      curDate:
        year + '-' + month + '-' + date,
    });

    fetch('${API}/films/').then(res => res.json()).then((json) => {
      const { results: films } = json;
      console.log(json)
      this.setState({ films });
    });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.title.search(regex) >= 0);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <CustomHeader navigation={this.props.navigation} />
        <Text style={fstyles.pagetitle}>Maintenance {this.state.curDate}</Text>
        <UserData/>

        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Star Wars film title"
          renderItem={({ title, release_date }) => (
            <TouchableOpacity onPress={() => this.setState({ query: title })}>
              <Text style={styles.itemText}>
                {title} ({release_date.split('-')[0]})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            AutocompleteExample.renderFilm(films[0])
          ) : (
            <Text style={styles.infoText}>
              Enter Title of a Star Wars movie
            </Text>
          )}
        </View>

        <DatePicker
        style={{width: 200}}
        date={this.state.curDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.startdate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(startdate) => {this.setState({startdate: startdate})}}
      />

      <DatePicker
        style={{width: 200}}
        date={this.state.curDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.date}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            marginTop: 30
          }
        }}
        onDateChange={(enddate) => {this.setState({enddate: enddate})}}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 10,
    //alignItems: 'center',
    marginTop: 10,
    //justifyContent: 'center',
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});
*/