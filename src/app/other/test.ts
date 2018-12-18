abstract class DetailView {
  /**
   * Це поле явно не буде створенщ але повинну бути такаж в класі де ми
   * наслідуємось від Даного (DetailView).
   */
  protected abstract state: string;

  /**
   * Це поле буде створеним, і щоб воно створилось, нам потрібно викликати
   * super(), в класі де ми наслідуємось від Даного (DetailView).
   */
  protected projectType = 'Indivdual';

  /**
   * просто описаний метод init.
   */
  public init() {
    console.log('Component initialized.');
  }
}

class ProductDetail extends DetailView {
  protected state = 'PRODUCT_STATE';

  constructor() {
    super();
  }

  /**
   * тут ти переписав метод init().
   */
  public init() {
    // Тут ти викликав баитківський ініт, щоб він теж спрацював
    // і добавив ще якісь нові дії
    super.init();
    console.log('And sub class initialized to.');
  }
}

export const productDetailView = new ProductDetail();
productDetailView.init();
