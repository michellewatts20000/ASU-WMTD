Vue.use(VueCleave);

var app = new Vue({
    // the element to apply the code to
    el: '#app',

    //define the variables
    data: {
        name: '',
        email: '',
        phone: '',
        postcode: '',
        employer: '',
        yesunion: '',
        nounion: '',
        sector: 'Community sector',
        year: '5',
        yesshift: '',
        noshift: '',
        annualLeaveRes: '',
        button_text: 'Submit',
        calculated: false,
        dollar_options: {
            prefix: '$',
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        },
        sector_options: [
            'Community sector',
            'Disability sector',
            'Child protection, youth and family services',
            'Women’s Services',
            'Community and Neighbourhood Centres',
            'Migrant and settlement services',
            'Policy and Advocacy',
            'Housing and homelessness',
            'Hospitality, tourism & food services',
            'Mental Health',
            'Not For Profit',
            'Other'
        ],
        year_options: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39',
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50'
        ]
    },

    methods: {
        // turns string into a number, converts it to 24 hour time if it's past 12pm
        variables: function () {

            console.log("name", this.name, "email", this.email, "phone", this.phone, "postcode", this.postcode, "yesunion", this.yesunion, "nounion", this.nounion, "yesshift", this.yesshift, "noshift", this.noshift, "year", this.year, "industry", this.industry)

        },

        annualLeave: function () {
            if (this.yesshift === "Shift Worker") {
                annualLeaveRes = (this.year * 4) + 1;
            } else {
                annualLeaveRes = this.year * 4;
            }
            return annualLeaveRes
        },

        personalLeave: function () {
            personalLeaveRes = this.year * 10;
            return personalLeaveRes
        },

        longService: function () {
            longServiceRes = (this.year * 0.8).toFixed(2);
            return longServiceRes
        },

        submitForm: function () {
            //show loading animation
            // this.calculated = true;
            this.button_text =
                '<i style="color:white; font-size: 1.1em;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';

            var formData = {
                "person": {
                    "given_name": this.name,
                    "postal_addresses": [{
                        "postal_code": this.postcode,

                    }],
                    "email_addresses": [{
                        "address": this.email
                    }],
                    "phone_numbers": [{
                        "number": "+61" + this.phone
                    }],
                    "custom_fields": {
                        "Sector": this.sector,
                        "Union Membership Status": (this.yesunion === "Union Member") ? this.yesunion : this.nounion,
                        "Shift Worker": (this.yesshift === "Shift Worker") ? this.yesshift : this.noshift,
                        "Employer": this.employer,
                        // "Annual Leave": annualLeaveRes,
                        // "Personal Leave": personalLeave(),
                        // "Long Service Leave": longService()
                    }
                },
                "add_tags": [
                    "C: Workers make the difference calculator (ASU)"
                ],
                "triggers": {
                    "autoresponse": {
                        "enabled": true
                    }
                }
            };

            axios
                .post(
                    'https://actionnetwork.org/api/v2/forms/d0a2f56e-105a-483a-b0dc-25a388bf229b/submissions',
                    formData, {}
                )
                .then(data => {
                    this.calculated = true;
                    console.log(data);
                    this.button_text = 'Submit';
                });
        }
    }
});