import React, { useState } from 'react';

import IndividualObservation from '../IndividualObservation';
import BulkObservation from '../BulkObservation';
import GeneralObservation from '../GeneralObservation';

import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
import { Container } from './styles';
import './styles.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function ObserverReport() {
  //Case data
  const [report_type, setReportType] = useState('');

  return (
    <div style={{ overflow: 'auto' }}>
      <Header />
      <Container>
        <div className="observer-report-container">
          <p>Campos com o símbolo " * " devem ser respondidos obrigatoriamente.</p>
          <section>
            <h1 className={'text-center'}>{'Protocolo de Observações do OCOVID19'}</h1>
            <p className={'text-center'}>
              {'Ao registrar informações aqui, você se responsabiliza legalmente pela veracidade delas.'}
            </p>
          </section>
          <div className="report-type col-md-12">
            <FormControl component={'fieldset'} className="col-md-9">
              <p>{'Escolha o tipo de observação que você quer reportar:*'}</p>
              <RadioGroup
                aria-label={'q'}
                name={'q1'}
                value={report_type}
                onChange={(e) => setReportType(e.target.value)}
              >
                <FormControlLabel value={'individual'} control={<Radio />} label={'Individual'} />
                <FormControlLabel value={'bulk'} control={<Radio />} label={'Em quantidade'} />
                <FormControlLabel value={'general'} control={<Radio />} label={'Geral'} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="content row d-flex p-2">
            <form className="col-md-12">
              {/* <div className="first-inputs col-md-12">
                                    <div className="name col-md-6" style={{ padding: 0, paddingRight: '10px' }}>
                                        <p>Nome do observador oficial:*</p>
                                        <input
                                            placeholder="Nome"
                                            className="col-md-12 form-control"
                                        ></input>
                                    </div>
                                    <div className="email col-md-6" style={{ padding: 0, paddingLeft: '10px' }}>
                                        <p>E-mail do observador oficial:*</p>
                                        <input
                                            placeholder="E-mail"
                                            className="col-md-12 form-control"
                                            type="e-mail"
                                        ></input>
                                    </div>
                                </div> */}

              {report_type === 'individual' && <IndividualObservation />}
              {report_type === 'bulk' && <BulkObservation />}
              {report_type === 'general' && <GeneralObservation />}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
