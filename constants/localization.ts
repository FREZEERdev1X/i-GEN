import { Language, TranslationSet } from '../types';

type Translations = {
  [key in Language]: TranslationSet;
};

export const translations: Translations = {
  [Language.EN]: {
    title: 'FREZEER i GEN',
    subtitle: 'Unleash your creativity with the power of AI',
    promptPlaceholder: 'e.g., A majestic ice dragon soaring through a neon blizzard...',
    generateButton: 'Generate Image',
    generatingButton: 'Generating...',
    errorTitle: 'An Error Occurred',
    errorGeneral: 'Something went wrong. Please try again.',
    aspectRatio: 'Aspect Ratio',
    download: 'Download',
    editImageTitle: 'Edit Your Image',
    editPromptPlaceholder: 'e.g., Add a futuristic helmet to the dragon...',
    editButton: 'Edit Image',
    editingButton: 'Editing...',
  },
  [Language.AR]: {
    title: 'فريزر آي جين',
    subtitle: 'أطلق العنان لإبداعك بقوة الذكاء الاصطناعي',
    promptPlaceholder: 'مثال: تنين جليدي مهيب يحلق وسط عاصفة ثلجية نيون...',
    generateButton: 'إنشاء صورة',
    generatingButton: 'جاري الإنشاء...',
    errorTitle: 'حدث خطأ',
    errorGeneral: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    aspectRatio: 'نسبة العرض إلى الارتفاع',
    download: 'تحميل',
    editImageTitle: 'تعديل صورتك',
    editPromptPlaceholder: 'مثال: أضف خوذة مستقبلية للتنين...',
    editButton: 'تعديل الصورة',
    editingButton: 'جاري التعديل...',
  },
};