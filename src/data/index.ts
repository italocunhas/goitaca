import { Size, Base, Complement, Topping, Extra, Testimonial } from '../types';

export const SIZES: Size[] = [
  { size: '300ml', price: 15, image: 'https://img.freepik.com/fotos-premium/acai-congelado-com-morango-banana-e-pacoca-isolado-no-fundo-branco_317399-1586.jpg' },
  { size: '500ml', price: 20, image: 'https://img.freepik.com/fotos-premium/acai-congelado-isolado-no-fundo-branco_317399-1613.jpg' },
  { size: '700ml', price: 25, image: 'https://img.freepik.com/fotos-premium/batido-de-sorvete-brasileiro-de-acai-berry-em-copo-plastico-com-banana-morango-e-leite-condensado-isolado-no-fundo-branco-vista-frontal-para-menu-e-midia-social_317399-1244.jpg' },
  { size: '1L', price: 35, image: '/images/acaiuml.jpg' },
];

export const BASES: Base[] = [
  { name: 'Açaí Tradicional', image: '/images/basetradicional.png' },
  { name: 'Açaí Batido com Morango', image: '/images/basetradicional.png' },
  { name: 'Açaí Batido com Banana', image: '/images/basetradicional.png' },
];

export const COMPLEMENTS: Complement[] = [
  { name: 'Leite em pó', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ082t5dB0wZnPuK0L23nM4r7n8qtB6Fbh46A1cUqgt_EOoFEo8ZtNYOmeKYF8Cu_JZVJoK-uwlYKtoswV7tdSSigRGL2X_OFh-hyUFYC8' },
  { name: 'Granola', image: 'https://royalcerealista.com.br/wp-content/uploads/2023/08/granola-com-frutas.webp' },
  { name: 'Amendoim torrado', image: 'https://images.tcdn.com.br/img/img_prod/757549/amendoim_torrado_s_pele_com_sal_granel_100g_282_1_d03285de553f521cea675f10a2b36da7.jpg' },
  { name: 'Paçoca', image: 'https://conteudo.imguol.com.br/c/entretenimento/42/2023/06/28/pacoca-1687974182631_v2_4x3.jpg' },
  { name: 'Aveia', image: 'https://agrosaber.com.br/wp-content/uploads/2021/11/Banner_AgroSaber_Aveia.png' },
  { name: 'Chocolate granulado', image: 'https://images.tcdn.com.br/img/img_prod/1098943/chocolate_granulado_macio_cacau_dori_120g_1und_34457_2_4b0f1f1343a43ebdcddccaf27063c197.jpg' },
  { name: 'Confetes', image: 'https://www.cestasefestas.com.br/wp-content/uploads/2022/09/confete-chocolate-colorido-sortido-disqueti-coloreti-jujuba-m-m-disqueti02.png' },
  { name: 'Chantilly', image: 'https://prezunic.vtexassets.com/arquivos/ids/187322/6567904b1ef3739680762f5a.jpg?v=638368827667100000' },
  { name: 'Bis', image: 'https://a-static.mlcdn.com.br/1500x1500/chocolate-bis-ao-leite-1008g-lacta/magazineluiza/237690600/29647715ca70ecb29b297dab6e5bafb5.jpg' },
];

export const TOPPINGS: Topping[] = [
  { name: 'Calda de chocolate', image: 'https://m.media-amazon.com/images/I/51okI77L6mL.jpg' },
  { name: 'Calda de morango', image: 'https://docemalu.vtexassets.com/arquivos/ids/5348516/18123-1.jpg?v=638421941024630000'},
  { name: 'Calda de caramelo', image: 'https://images.tcdn.com.br/img/img_prod/746520/cobertura_de_caramelo_para_sorvete_1_3kg_marvi_5790253_1_20200430133248.jpg' },
  { name: 'Calda de leite condensado', image: 'https://docemalu.vtexassets.com/arquivos/ids/5348461/18008-1.jpg?v=638421939517630000' },
  { name: 'Calda de maracujá', image: 'https://docemalu.vtexassets.com/arquivos/ids/5344480/100721-1.jpg?v=638421837728870000' },
  { name: 'Calda de amendoim', image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lovufe89ykdu1d' },
  { name: 'Calda de doce de leite', image: 'https://images.tcdn.com.br/img/img_prod/919170/cobertura_taca_doce_de_leite_1_3kg_294_1_efa2e8f5f305cd49fc997ca87b75fdfb.jpg' },
  { name: 'Calda de coco', image: 'https://images.tcdn.com.br/img/img_prod/655345/cobertura_sabor_coco_1_3kg_marvi_6261_1_0a4f524706988141dcaae84169dc0b97_20231017103839.png' },
  { name: 'Calda de chocolate branco', image: 'https://images.tcdn.com.br/img/img_prod/1106817/cobertura_para_sorvete_marvi_chocolate_branco_1_3kg_18457_1_1d80772e6789cd9e9ef413bc08e45e64.jpg' },
];

export const EXTRAS: Extra[] = [
  { name: 'Leite condensado', price: 3, image: 'https://images.tcdn.com.br/img/img_prod/1098943/leite_condensado_molico_395g_1und_34457_2_4b0f1f1343a43ebdcddccaf27063c197.jpg' },
  { name: 'Leite em pó', price: 3, image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ082t5dB0wZnPuK0L23nM4r7n8qtB6Fbh46A1cUqgt_EOoFEo8ZtNYOmeKYF8Cu_JZVJoK-uwlYKtoswV7tdSSigRGL2X_OFh-hyUFYC8' },
  { name: 'Granola', price: 3, image: 'https://royalcerealista.com.br/wp-content/uploads/2023/08/granola-com-frutas.webp' },
  { name: 'Amendoim torrado', price: 3, image: 'https://images.tcdn.com.br/img/img_prod/757549/amendoim_torrado_s_pele_com_sal_granel_100g_282_1_d03285de553f521cea675f10a2b36da7.jpg' },
  { name: 'Paçoca', price: 3, image: 'https://conteudo.imguol.com.br/c/entretenimento/42/2023/06/28/pacoca-1687974182631_v2_4x3.jpg' },
  { name: 'Aveia', price: 3, image: 'https://agrosaber.com.br/wp-content/uploads/2021/11/Banner_AgroSaber_Aveia.png' },
  { name: 'Chocolate granulado', price: 3, image: 'https://images.tcdn.com.br/img/img_prod/1098943/chocolate_granulado_macio_cacau_dori_120g_1und_34457_2_4b0f1f1343a43ebdcddccaf27063c197.jpg' },
  { name: 'Confetes', price: 3, image: 'https://www.cestasefestas.com.br/wp-content/uploads/2022/09/confete-chocolate-colorido-sortido-disqueti-coloreti-jujuba-m-m-disqueti02.png' },
  { name: 'Chantilly', price: 3, image: 'https://prezunic.vtexassets.com/arquivos/ids/187322/6567904b1ef3739680762f5a.jpg?v=638368827667100000' },
  { name: 'Bis', price: 3, image: 'https://a-static.mlcdn.com.br/1500x1500/chocolate-bis-ao-leite-1008g-lacta/magazineluiza/237690600/29647715ca70ecb29b297dab6e5bafb5.jpg' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thiago Costa",
    rating: 5,
    comment: "Melhor açaí de Bangu! Sempre gostoso e com ótimos complementos.",
    image: "https://scontent.fsdu15-1.fna.fbcdn.net/v/t39.30808-6/481257160_10227855343956826_2749165660174710359_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFsEomYPL3ymasxl3PaeGC8d0I00T0ztYl3QjTRPTO1ibTZra4yZCuuGRpYu3Rf4c4jq8KeoDLg24CUoTMMTFEK&_nc_ohc=8n9V2HKieQsQ7kNvgFAZ5fB&_nc_oc=AdjKIveiL1Gj-Oh7msncOuPUXqTG3WMQUkghUOdBm19OhZjkBdIDm1h8_C0pINSz46a6BIZM-jJunQs7x2RuIbPr&_nc_zt=23&_nc_ht=scontent.fsdu15-1.fna&_nc_gid=Adz3KoqCJ5TmL_p9NB80qNV&oh=00_AYBP2ekO2Szdm7HK7BdCa5FAyTJDIWh9oHVzj_mgilnEgA&oe=67CFAF55"
  },
  {
    name: "Maria",
    rating: 5,
    comment: "O melhor açaí que conheço!",
    image: "https://scontent.fsdu15-1.fna.fbcdn.net/v/t39.30808-1/453067763_2441398289544370_2013242866873683718_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHviooY_uP4uA8ZZ26J-0jKSGUsznj0mGRIZSzOePSYZCTn8Bb1j-zLgi7ie1KS8eod86FOaM8cSlR_lOSSdd0B&_nc_ohc=VWtuBi2EvkMQ7kNvgG5Nd8M&_nc_oc=Adgz7V0asDhgjuyxRfaIIpuIaySZnKZ9TRnbRYXdmsHPXMW59zzACOcgKZmKdSagI_ylPX2B-qF7oiY3B1GmDkbVtK_NplASF&_nc_zt=24&_nc_ht=scontent.fsdu15-1.fna&_nc_gid=AWTDuqqB3-WixqAX3Pi4qgO&oh=00_AYC7PfHuGytiBUfR4sjpmRbAULMQ7PjpsmuiiLD8kJJO5w&oe=67CFAAEC"
  },
  {
    name: "Ana Oliveira",
    rating: 5,
    comment: "As coberturas são maravilhosas, principalmente a de chocolate!",
    image: "https://scontent.fsdu15-1.fna.fbcdn.net/v/t39.30808-6/441457112_2614108672093340_6794675814755160379_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF9ot_g2z0ypfWMqE0aQT0PqguKWBvb78yqC4pYG9vvzK7Mt0HXsRM4L3UOuI6CIndncHXtGaYedjHnwEaJwCrv&_nc_ohc=W3PyDpfh1ngQ7kNvgHIz2Mu&_nc_oc=AdjsYQUeQoVcLlve_tzMhn1Qu_q_NGuR_mtwpKcj0u8A0XYRJc8WLfmmGH0c0wjJyAhakjWQCDfIBbVtK_NplASF&_nc_zt=23&_nc_ht=scontent.fsdu15-1.fna&_nc_gid=ASIf907hRUCOATWncNSJCFx&oh=00_AYALn4RwkLQPpX_qLiQWMjvoT0smX8VCJHInqdf8CVKTHw&oe=67CFCE12"
  }
];