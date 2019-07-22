export const timeCityResult = {
  snippet: {
    extra: {
      time_data: {
        cities_by_tz: null,
        main: {
          expression: 'Thursday, May 9, 2019',
          location: 'Berlin',
          mapped_location: 'Berlin, Germany',
          time: '9:05 am',
          tz_info: 'Europe/Berlin (UTC/GMT 2.0)'
        }
      }
    }
  }
}

export const timeCountryResult = {
  snippet: {
    extra: {
      time_data: {
        cities_by_tz: [
          {
            cities: [
              'Rockingham',
              'Mandurah',
              'Bunbury'
            ],
            time_info: {
              expression: '05/09/2019',
              time: '4:15 pm',
              tz_info: 'GMT+8.0'
            }
          },
          {
            cities: [
              'Adelaide',
              'Darwin',
              'Maitland'
            ],
            time_info: {
              expression: '05/09/2019',
              time: '5:45 pm',
              tz_info: 'GMT+9.5'
            }
          },
          {
            cities: [
              'Sydney',
              'Melbourne',
              'Brisbane'
            ],
            time_info: {
              expression: '05/09/2019',
              time: '6:15 pm',
              tz_info: 'GMT+10.0'
            }
          }
        ],
        main: {
          expression: 'Thursday, May 9, 2019',
          location: 'Canberra',
          mapped_location: 'Canberra, Australia',
          time: '6:15 pm',
          tz_info: 'Australia/Sydney (UTC/GMT 10.0)'
        }
      }
    }
  }
}
