import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import MyContactForm from 'components/MyContactForm/MyContactForm';
import MyContactList from 'components/ContactList/ContactList';
import MyContactsFilter from 'components/MyContactsFilter/MyContactsFilter';

import css from './MyContacts.module.css';

const MyContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedName = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedName);
    });

    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h2 className={css.title}>Phonebook</h2>
      <MyContactForm onSubmit={addContact} />
      <MyContactsFilter handleChange={handleFilter} value={filter} />
      <h2 className={css.title}>Contacts</h2>
      <MyContactList
        removeContact={removeContact}
        contacts={filteredContacts}
      />
    </div>
  );
};

export default MyContacts;

// class MyContacts extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (contacts && contacts.length) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem('my-contacts', JSON.stringify(contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     if (this.isDublicate(name)) {
//       return alert(`${name} is already in contacts`);
//     }

//     this.setState(prevState => {
//       const { contacts } = prevState;
//       const newContact = {
//         id: nanoid(),
//         name,
//         number,
//       };

//       return { contacts: [newContact, ...contacts], name: '', number: '' };
//     });
//   };

//   handleFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => {
//       const newContact = contacts.filter(contact => contact.id !== id);
//       return { contacts: newContact };
//     });
//   };

// isDublicate(name) {
//   const normalizedName = name.toLowerCase();
//   const { contacts } = this.state;
//   const result = contacts.find(({ name }) => {
//     return name.toLowerCase() === normalizedName;
//   });

//     return Boolean(result);
//   }

//   getFilteredContacts() {
//     const { filter, contacts } = this.state;

//     if (!filter) {
//       return contacts;
//     }

//     const normalizedName = filter.toLowerCase();
//     const result = contacts.filter(({ name }) => {
//       return name.toLowerCase().includes(normalizedName);
//     });

//     return result;
//   }

//   render() {
//     const { addContact, removeContact, handleFilter } = this;
//     const contacts = this.getFilteredContacts();

//     return (
//       <div>
//         <h2 className={css.title}>Phonebook</h2>
//         <MyContactForm onSubmit={addContact} />
//         <MyContactsFilter
//           handleChange={handleFilter}
//           value={this.state.filter}
//         />
//         <h2 className={css.title}>Contacts</h2>
//         <MyContactList removeContact={removeContact} contacts={contacts} />
//       </div>
//     );
//   }
// }
