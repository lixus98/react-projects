import React, {Component} from 'react';
import SingleService from './SingleService';

const services = [
    {title: 'E-commerce', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at euismod leo, nec auctor arcu. Maecenas in nisi lectus. Suspendisse scelerisque turpis eget orci consequat lacinia. Praesent feugiat purus in libero dapibus, id ullamcorper lacus placerat.', icon: 'fa-shopping-cart'},
    {title: 'Responsive Design', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at euismod leo, nec auctor arcu. Maecenas in nisi lectus. Suspendisse scelerisque turpis eget orci consequat lacinia. Praesent feugiat purus in libero dapibus, id ullamcorper lacus placerat.', icon: 'fa-laptop'},
    {title: 'Web Security', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at euismod leo, nec auctor arcu. Maecenas in nisi lectus. Suspendisse scelerisque turpis eget orci consequat lacinia. Praesent feugiat purus in libero dapibus, id ullamcorper lacus placerat.', icon: 'fa-lock'}
];

class Services extends Component{

    render(){

        return (

            <section id="services">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <h2 className="section-heading text-uppercase">Services</h2>
                  <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
              </div>
              <div className="row text-center">

                {services.map((service, index) => {
                    return <SingleService {...service} key={index} />
                })}

              </div>
            </div>
          </section>

        )

    }

}

export default Services;