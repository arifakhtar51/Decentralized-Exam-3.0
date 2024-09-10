(()=>{"use strict";const e=window.wp.hooks,t=window.wp.blocks,a=window.lodash;(0,e.addFilter)("blocks.registerBlockType","kadence/animation",(function(e){return(0,t.hasBlockSupport)(e,"ktanimate")&&(e.attributes=(0,a.assign)(e.attributes,{kadenceAnimation:{type:"string"},kadenceAOSOptions:{type:"array",default:[{duration:"",offset:"",easing:"",once:"",delay:"",delayOffset:""}]}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/formpro",(function(e,t){return"kadence/form"!==t||(e.attributes=(0,a.assign)(e.attributes,{autoEmail:{type:"array",default:[{emailTo:"",subject:"",message:"",fromEmail:"",fromName:"",replyTo:"",cc:"",bcc:"",html:!0}]},entry:{type:"array",default:[{formName:"",userIP:!0,userDevice:!0}]},sendinblue:{type:"array",default:[{list:[],map:[],doubleOptin:!1,templateId:"",redirectionUrl:""}]},mailchimp:{type:"array",default:[{list:[],groups:[],map:[],doubleOptin:!1,tags:[]}]},webhook:{type:"array",default:[{url:""}]},activecampaign:{type:"array",default:[{list:[],tags:[],map:[],doubleOptin:!1}]}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/dynamic",(function(e,r){return(0,t.hasBlockSupport)(e,"ktdynamic")&&(e.attributes=(0,a.assign)(e.attributes,{kadenceDynamic:{type:"object"}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/blockConditional",(function(e,r){return(0,t.hasBlockSupport)(e,"ktdynamic")&&(e.attributes=(0,a.assign)(e.attributes,{kadenceConditional:{type:"object"}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/blockFieldConditional",(function(e,r){return(0,t.hasBlockSupport)(e,"ktfieldconditional")&&(e.attributes=(0,a.assign)(e.attributes,{kadenceFieldConditional:{type:"object"}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/block-label",(function(e){return(0,t.hasBlockSupport)(e,"kbMetadata")&&(e.attributes=(0,a.assign)(e.attributes,{metadata:{type:"object",default:{name:""}}})),e})),(0,e.addFilter)("blocks.registerBlockType","kadence/queryFilters",(function(e,t){return["kadence/query-filter","kadence/query-filter-buttons","kadence/query-filter-date","kadence/query-filter-checkbox","kadence/query-filter-range","kadence/query-filter-search","kadence/query-filter-woo-attribute","kadence/query-filter-rating"].includes(t)?(e.attributes=(0,a.assign)(e.attributes,{source:{type:"string",default:"kadence/query-filter-date"===t?"wordpress":"kadence/query-filter-range"!==t&&"kadence/query-filter-woo-attribute"!==t&&"kadence/query-filter-rating"!==t||!kadence_blocks_params.hasWoocommerce?"taxonomy":"woocommerce"},fieldType:{type:"string",default:"post_field"},taxonomy:{type:"string",default:"category"},post_field:{type:"string",default:"kadence/query-filter-range"===t&&kadence_blocks_params.hasWoocommerce?"_price":"kadence/query-filter-rating"===t&&kadence_blocks_params.hasWoocommerce?"_average_rating":"kadence/query-filter-woo-attribute"===t&&kadence_blocks_params.hasWoocommerce?"1":"post_type"},include:{type:"array",default:[]},exclude:{type:"array",default:[]},label:{type:"string",default:""},showLabel:{type:"boolean",default:!0},labelIcon:{type:"string",default:""},labelIconPosition:{type:"string",default:"before"},showLabelIcon:{type:"boolean",default:!1},slug:{type:"string",default:""}}),e):e})),(0,e.addFilter)("blocks.registerBlockType","kadence/queryFilters",(function(e,t){return["kadence/query-filter","kadence/query-filter-buttons","kadence/query-filter-date","kadence/query-filter-checkbox","kadence/query-filter-range","kadence/query-filter-search","kadence/query-filter-woo-attribute","kadence/query-filter-rating"].includes(t)?(e.attributes=(0,a.assign)(e.attributes,{color:{type:"string",default:""},borderStyle:{type:"array",default:[{top:["","",""],right:["","",""],bottom:["","",""],left:["","",""],unit:"px"}]},tabletBorderStyle:{type:"array",default:[{top:["","",""],right:["","",""],bottom:["","",""],left:["","",""],unit:"px"}]},mobileBorderStyle:{type:"array",default:[{top:["","",""],right:["","",""],bottom:["","",""],left:["","",""],unit:"px"}]},borderRadius:{type:"array",default:["","","",""]},tabletBorderRadius:{type:"array",default:["","","",""]},mobileBorderRadius:{type:"array",default:["","","",""]},borderRadiusUnit:{type:"string",default:"px"},background:{type:"string",default:""},gradient:{type:"string",default:""},backgroundType:{type:"string",default:"normal"},typography:{type:"array",default:[{size:["","",""],sizeType:"px",lineHeight:["","",""],lineType:"",letterSpacing:["","",""],letterType:"px",textTransform:"",family:"",google:"",style:"",weight:"",variant:"",subset:"",loadGoogle:!0}]}}),e):e}))})();