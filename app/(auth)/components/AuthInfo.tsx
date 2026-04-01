import { Brain, Lightbulb, TrendingUp } from "lucide-react";

const AuthInfo = () => {
  return (
    <div>
      <h1 className="text-4xl mb-4">Осознанные заметки</h1>
      <p className="text-[#6b7280] text-lg mb-8">
        Ведите дневник мыслей и получайте поддержку AI для распознавания
        когнитивных искажений и эмоционального баланса
      </p>
      <div className="grid gap-6 font-sans">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2e0e9] flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-[#8b8cf2]" />
          </div>
          <div>
            <h3 className="mb-2">Распознавание искажений</h3>
            <p className="text-[#6b7280]">
              AI помогает замечать катастрофизацию, чтение мыслей и другие
              паттерны мышления
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2e0e9] flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-[#8b8cf2]" />
          </div>
          <div>
            <h3 className="mb-2">Рефрейминг и рефлексия</h3>
            <p className="text-[#6b7280]">
              Получайте альтернативные взгляды на ситуации и вопросы для
              углублённого самоанализа
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#e2e0e9] flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-[#8b8cf2]" />
          </div>
          <div>
            <h3 className="mb-2">Эмоциональная динамика</h3>
            <p className="text-[#6b7280]">
              Отслеживайте изменения эмоций с помощью визуальных графиков
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInfo;
