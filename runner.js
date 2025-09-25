// Save a value to the Capacitor KV store
addEventListener('mybrokerclient', async (resolve, reject, args) => {
  // Options for MQTT connection
  const options = {
    clientId: 'mqtt-web-client-' + Math.random().toString(16).substr(2, 8),
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    username: 'nainghtweoo',
    password: 'NaingHtweOo123'
  };

  try {
    // Create MQTT client
    client = mqtt.connect('wss://1bd2efffc158425cb8026a64520aa63b.s1.eu.hivemq.cloud:8884/mqtt', options);

    // Event handlers
    client.on('connect', () => {
      console.log('Connected');
      let scheduleDate = new Date();
      scheduleDate.setSeconds(scheduleDate.getSeconds() + 5);
      CapacitorNotifications.schedule([
        {
          id: Math.floor(Math.random() * 1000),
          title: 'Background Connected 🧙‍♂️',
          body: 'Connected to MQTT broker',
          scheduleAt: scheduleDate,
        },
      ]);
    });

    client.on('error', (error) => {
      console.error('Connection error:', error);
    });

    client.on('close', () => {
      console.log('Disconnected');
    });

    client.on('message', (topic, message) => {
      // Message received
      console.log('Received message:', topic, message.toString());
      let scheduleDate = new Date();
      scheduleDate.setSeconds(scheduleDate.getSeconds() + 5);
      CapacitorNotifications.schedule([
        {
          id: Math.floor(Math.random() * 1000),
          title: 'Background ' + topic + '🧙‍♂️',
          body: 'Message : ' + message.toString(),
          scheduleAt: scheduleDate,
        },
      ]);
    });

    // subscribe to topic 'my/test/topic'
    client.subscribe('my/test/topic');

    // publish message 'Hello' to topic 'my/test/topic'
    client.publish('my/test/topic', 'Hello');

  } catch (error) {
    console.error('Failed to connect:', error);
    reject(error);
  }
  resolve();
});


// Save a value to the Capacitor KV store
addEventListener('testSave', async (resolve, reject, args) => {
  try {
    CapacitorKV.set('foo', 'my bar 42');
    resolve();
  } catch (err) {
    console.error(err);
    reject(err);
  }
});

// Get a value from the Capacitor KV store
addEventListener('testLoad', async (resolve, reject, args) => {
  try {
    const value = CapacitorKV.get('foo');
    resolve(value);
  } catch (err) {
    console.error(err);
    reject(err);
  }
});

// Make a fetch request to the randomuser API and return first user

addEventListener('fetchTest', async (resolve, reject, args) => {
  try {
    const res = await fetch('https://randomuser.me/api/');
    if (!res.ok) {
      throw new Error('Could not fetch user');
    }
    const result = await res.json();
    resolve(result['results'][0]);
  } catch (err) {
    console.error(err);
    reject(err);
  }
});

// Trigger a local notification

addEventListener('notificationTest', async (resolve, reject, args) => {
  try {
    setTimeout(() => {
      let scheduleDate = new Date();
      scheduleDate.setSeconds(scheduleDate.getSeconds() + 5);
      const basicTime = new Date().toLocaleTimeString();
      CapacitorNotifications.schedule([
        {
          id: 42,
          title: basicTime + 'Background Magic 🧙‍♂️',
          body: 'This comes from the background runner',
          scheduleAt: scheduleDate,
        },
      ]);
    }, 3000);

    resolve();
  } catch (err) {
    console.error(err);
    reject(err);
  }
});