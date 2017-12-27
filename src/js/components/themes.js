import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import Select from 'react-select';
import { connectRefinementList } from 'react-instantsearch/connectors';
import { reject, filter, map } from 'lodash';

import { FilterButton, getColor } from './sidebar';
import {
  toggleTheme,
  toggleThemeFacet,
  resetParams,
  THEME,
} from '../actions/search-actions';
import '../../scss/dropdowns.css';


class ThemeListItem extends Component {
  state = {}
  
  measureButton() {
    let textWidth = this.button.children[0].getBoundingClientRect().width;
    this.setState({style: {flexBasis: textWidth + 24}});
  }
  
  componentDidMount() {
    this.measureButton();
  }
  
  componentWillReceiveProps() {
    this.measureButton();
  }
  
  render() {
    let { props, state } = this;
    return (
      <li className={`refinement-list__item ${props.className || ''}`} style={state.style}>
        {props.children ||
          <FilterButton
           style={props.style}
           label={props.theme.title}
           isActive={props.theme.isActive}
           onClick={props.refine}
           buttonRef={e => this.button = e} />}
      </li>
    )
  }
}


const ThemeFilters = connectRefinementList(({children, themes = [], items = [], toggle}) => {

  const createListItems = (theme, i) =>
    <ThemeListItem
      theme={theme}
      style={getColor(i)}
      key={theme.objectID}
      refine={() => toggle(theme)} />

  let filteredLabels = map(items, 'label')
  let filtered = filter(themes, t => filteredLabels.includes(t.title));
  let activeThemes = filter(filtered, 'isActive').map(createListItems);
  
  let inActiveThemes = reject(filtered, 'isActive')
  let featuredThemes = filter(inActiveThemes, 'isFeatured').map(createListItems);
  let otherThemes = reject(inActiveThemes, 'isFeatured').map(createListItems);
  
  return activeThemes
    .concat(featuredThemes)
    .concat(children)
    .concat(otherThemes);
});

export const ThemesList = connect(({ themes }) => {
  return {
    themes: themes.items.map(id => themes.themes[id])
  }
}, dispatch => bindActionCreators({
  toggleTheme
}, dispatch))(({ onViewMore, themes, toggleTheme, location, match }) => {
  return (
    <ul className="refinement-list">
      <ThemeFilters
        attributeName="title"
        limitMin={1000}
        themes={themes}
        toggle={theme => toggleTheme(theme, location, match)}>
        
        <li className="refinement-list__item refinement-list__item-more">
          <FilterButton onClick={onViewMore} style={{backgroundColor: 'rgba(182, 182, 182, 0.2)', color: '#444444'}}>
            Voir tous les thèmes
          </FilterButton>
        </li>
        
      </ThemeFilters>
        
    </ul>
  );
});

export class ThemesDropdown extends Component {
  state = {}
  
  constructor(props) {
    super(props);
    let active = props.themes[props.activeThemes[0]];
    if (active) {
      this.state.value = {
        value: active.objectID,
        label: active.title
      };
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.activeThemes.length) {
      this.setState({ value: null, label: null })
    }
  }
  
  handleChange = selected => {
    let { toggleTheme, themes, match, location, push, resetParams } = this.props;
    let theme = themes[selected.value];
    
    this.setState(selected);
    resetParams(location, match, THEME);
    push(`${match.url}?theme=${theme.slug}`);
    toggleTheme(theme.objectID);
  }
  
  render() {
    return <Select
            className="theme-dropdown"
            placeholder="Je m’interesse à…"
            searchable={false}
            clearable={false}
            value={this.state.value}
            options={this.props.themesOptions}
            onChange={this.handleChange}
          />
  }
}

ThemesDropdown = connectRefinementList(ThemesDropdown);

ThemesDropdown = connect(({ themes: { themes, items, activeThemes }}) => ({
  themesOptions: items.map(id => ({label: themes[id].title, value: id})),
  themes,
  activeThemes
}), dispatch => ({
  push: url => dispatch(push(url)),
  toggleTheme: theme => dispatch(toggleThemeFacet(theme)),
  resetParams: (...args) => dispatch(resetParams(...args))
}))(ThemesDropdown);