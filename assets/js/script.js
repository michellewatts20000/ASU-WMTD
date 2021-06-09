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
        yesunion: '',
        nounion: '',
        industry: 'Community & disability services',
        year: '5',
        yesshift: '',
        noshift: '',
        button_text: 'Submit',
        calculated: false,
        dollar_options: {
            prefix: '$',
            numeral: true,
            numeralThousandsGroupStyle: 'thousand'
        },
        industry_options: [
            'Administration & professional services',
            'Agriculture, forestry & fishing',
            'Community & disability services',
            'Construction',
            'Education',
            'Entertainment, arts & recreation',
            'Finance, banking & insurance',
            'Health',
            'Hospitality, tourism & food services',
            'Manufacturing',
            'Media & Communication',
            'Mining',
            'Property & other services',
            'Public services & Emergency Services ',
            'Retail',
            'Trades & trades assistants',
            'Transport',
            'Utilities',
            'Warehousing & logistics',
            'Something else. None of above fit what I do'
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
            '21'
        ]
    },

    methods: {
        // turns string into a number, converts it to 24 hour time if it's past 12pm
        variables: function () {

            console.log("name", this.name, "email", this.email, "phone", this.phone, "postcode", this.postcode, "yesunion", this.yesunion, "nounion", this.nounion, "yesshift", this.yesshift, "noshift", this.noshift, "year", this.year, "industry", this.industry)

        },


        calculation: function () {


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
                        "number": this.phone
                    }],
                    "custom_fields": {
                        "Industry": this.industry,

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