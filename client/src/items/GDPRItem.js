class GDPRItem {

  constructor(item) {
    this.id = item.id;
    this.ref_code = item.ref_code;
    this.building_name = item.building_name;
    this.address = item.address;
    this.extra = item.extra;
    this.reference = item.reference;
    this.reference_phone = item.reference_phone;
    this.zone = item.zone;
    this.creation_date = item.creation_date;
    this.gdpr_main_reference = item.gdpr_main_reference;
    this.gdpr_main_reference_email = item.gdpr_main_reference_email;
    this.gdpr_secondary_reference = item.gdpr_secondary_reference;
    this.gdpr_secondary_reference_email = item.gdpr_secondary_reference_email;
    this.creator = item.creator;
    this.submitted = item.gdpr_submitted;
    this.first_reminder = item.first_reminder;
    this.second_reminder = item.second_reminder;
    this.third_reminder = item.third_reminder;
  }

  toString() {
    return ( 'id: ' + this.id + '/n' +
            'ref. code: ' + this.ref_code + '/n' +
            'building_name: ' + this.building_name + '/n' +
            'address: ' + this.address + '/n' +
            'extra: ' + this.extra + '/n' +
            'reference: ' + this.reference + '/n' +
            'reference_phone: ' + this.reference_phone + '/n' +
            'zone: ' + this.zone + '/n' +
            'creation_date: ' + this.creation_date + '/n' +
            'gdpr_main_reference: ' + this.gdpr_main_reference + '/n' +
            'gdpr_main_reference_email: ' + this.gdpr_main_reference_email + '/n' +
            'gdpr_secondary_reference: ' + this.gdpr_secondary_reference + '/n' +
            'gdpr_secondary_reference_email: ' + this.gdpr_secondary_reference_email + '/n' +
            'creator: ' + this.creator + '/n' +
            'submitted' + this.submitted + '/n' +
            'first_reminder' + this.first_reminder + '/n' +
            'second_reminder' + this.second_reminder + '/n' +
            'third_reminder' + this.third_reminder
          );
  }
}

export default GDPRItem;
