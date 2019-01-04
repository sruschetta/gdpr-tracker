import GDPRItem from '../items/GDPRItem';

class DBManager {

    static instance = null;

    static getInstance() {
      if( DBManager.instance === null ) {
        DBManager.instance = new DBManager();
      }

      return this.instance;
    }

    constructor() {

      this.gdpr_items = [
        new GDPRItem( {
                        id: '0',
                        ref_code: '001',
                        building_name: 'palazzo A',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
        new GDPRItem( {
                        id: '1',
                        ref_code: '002',
                        building_name: 'palazzo B',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
        new GDPRItem( {
                        id: '2',
                        ref_code: '003',
                        building_name: 'palazzo C',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
        new GDPRItem( {
                        id: '3',
                        ref_code: '004',
                        building_name: 'palazzo D',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
        new GDPRItem( {
                        id: '4',
                        ref_code: '005',
                        building_name: 'palazzo E',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
        new GDPRItem( {
                        id: '5',
                        ref_code: '006',
                        building_name: 'palazzo F',
                        address: 'via canova 12 - Milano',
                        extra: 'le mie note',
                        reference: 'Termoidraulica Calor System',
                        reference_phone: '0323 60556',
                        zone: 'Zona A',
                        creation_date: (new Date()),
                        gdpr_main_reference: 'John Doe',
                        gdpr_main_reference_email: 'john.doe@email.com',
                        gdpr_secondary_reference: 'Foo Bar',
                        gdpr_secondary_reference_email: 'foobar@email.com',
                        creator_id: '1'
                      }),
          new GDPRItem( {
                          id: '6',
                          ref_code: '001',
                          building_name: 'palazzo A',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        }),
          new GDPRItem( {
                          id: '7',
                          ref_code: '002',
                          building_name: 'palazzo B',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        }),
          new GDPRItem( {
                          id: '8',
                          ref_code: '003',
                          building_name: 'palazzo C',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        }),
          new GDPRItem( {
                          id: '9',
                          ref_code: '004',
                          building_name: 'palazzo D',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        }),
          new GDPRItem( {
                          id: '10',
                          ref_code: '005',
                          building_name: 'palazzo E',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        }),
          new GDPRItem( {
                          id: '11',
                          ref_code: '006',
                          building_name: 'palazzo F',
                          address: 'via canova 12 - Milano',
                          extra: 'le mie note',
                          reference: 'Termoidraulica Calor System',
                          reference_phone: '0323 60556',
                          zone: 'Zona A',
                          creation_date: (new Date()),
                          gdpr_main_reference: 'John Doe',
                          gdpr_main_reference_email: 'john.doe@email.com',
                          gdpr_secondary_reference: 'Foo Bar',
                          gdpr_secondary_reference_email: 'foobar@email.com',
                          creator_id: '1'
                        })
      ];
    }

    getGDPRItems = function() {
      return this.gdpr_items;
    }

    addGDPRItem = function(item) {
      this.gdpr_items.push(item);
    }

    updateGDPRItem = function(item) {
      console.log(item);
        var res = this.gdpr_items.find((element) => {
            return element.id === item.id;
        });

        var index = this.gdpr_items.indexOf(res);
        this.gdpr_items[index] = item;

        console.log(this.gdpr_items);
    }
}

export default DBManager;
