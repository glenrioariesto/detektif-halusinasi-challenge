import React from 'react';
import { Award, RotateCcw, Check, BookOpen, ImageIcon, FileText } from 'lucide-react';
import { UserLevelAnswer } from '../../types';
import { CAMPAIGN_LEVELS } from '../../data/questions';

interface ResultPageProps {
  score: number;
  answers: UserLevelAnswer[];
  onRestart: () => void;
  getRank: (score: number) => { title: string; desc: string; color: string };
}

export function ResultPage({ score, answers, onRestart, getRank }: ResultPageProps) {
  const rank = getRank(score);
  const accuracy = Math.round((score / CAMPAIGN_LEVELS.length) * 100);

  return (
    <div className="min-h-screen w-screen bg-transparent relative flex flex-col items-center justify-center p-6 text-emerald-200 scanlines overflow-y-auto">
      {/* Glow background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-4xl w-full flex flex-col items-center py-8 select-none animate-fadeIn">
        {/* Victory Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-[#091509] border-2 border-emerald-500 flex items-center justify-center mb-4 glow-emerald">
          <Award className="w-8 h-8 text-emerald-400" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl md:text-3xl font-extrabold font-display mb-1 text-center uppercase tracking-wide text-emerald-100">
          Evaluasi Laporan Investigasi
        </h2>
        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-6 font-bold">
          Kampanye Misi #HAL-102 Selesai Dievaluasi
        </p>

        {/* Score & Rank Dashboard Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-8">
          {/* Circular Score Gauge */}
          <div className="md:col-span-4 bg-[#081208]/90 border border-emerald-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-md">
            <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-4">
              Indeks Akurasi
            </span>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-950"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500"
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${accuracy >= 25 ? '150% -50%' : '50% -50%'}, ${accuracy >= 50 ? '150% 150%' : '50% -50%'}, ${accuracy >= 75 ? '-50% 150%' : '50% -50%'}, ${accuracy >= 100 ? '-50% -50%' : '50% -50%'})`,
                  transform: 'rotate(45deg)'
                }}
              ></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black font-mono text-emerald-100">{accuracy}%</span>
                <span className="text-[8px] font-mono text-emerald-450 uppercase font-bold mt-1">
                  {score} / {CAMPAIGN_LEVELS.length} Terkunci
                </span>
              </div>
            </div>
          </div>

          {/* Rank Badge description */}
          <div className="md:col-span-8 bg-[#081208]/90 border border-emerald-900 rounded-2xl p-6 flex flex-col justify-center backdrop-blur-md relative overflow-hidden">
            <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-2">
              Pangkat Kredibilitas
            </span>
            
            <div className={`inline-flex self-start px-3 py-1.5 rounded-lg text-xs font-mono font-bold mb-3 ${rank.color}`}>
              {rank.title}
            </div>

            <p className="text-emerald-300 text-xs leading-relaxed max-w-lg mb-4 font-medium">
              {rank.desc}
            </p>
            
            <div className="flex items-center gap-4 text-xs font-mono text-emerald-450 font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 border border-emerald-950"></div>
                <span>Kasus Sukses: {score}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-teal-400 border border-emerald-950"></div>
                <span>Tingkat Kampanye: {CAMPAIGN_LEVELS.length} Level</span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Review Log Table */}
        <div className="w-full bg-[#081208]/90 border border-emerald-900 rounded-2xl p-6 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2 border-b border-emerald-950 pb-3 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono text-xs font-bold text-emerald-100 uppercase tracking-wider">
              Rekapitulasi Temuan Halusinasi
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-emerald-250">
              <thead>
                <tr className="border-b border-emerald-950 text-emerald-500 pb-2">
                  <th className="pb-2 font-bold uppercase tracking-wider w-12 text-center">Kasus</th>
                  <th className="pb-2 font-bold uppercase tracking-wider">Topik/Kategori</th>
                  <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Tipe Mode</th>
                  <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Percobaan</th>
                  <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-950/40">
                {CAMPAIGN_LEVELS.map((c) => {
                  const ans = answers.find(a => a.levelId === c.id);
                  return (
                    <tr key={c.id} className="hover:bg-emerald-950/10">
                      <td className="py-3 text-center text-emerald-500">#0{c.id}</td>
                      <td className="py-3 font-sans">
                        <div className="font-bold text-emerald-100">{c.title}</div>
                        <div className="text-[10px] text-emerald-500">{c.category}</div>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1 bg-[#020502]/60 border border-emerald-900 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300">
                          {c.type === 'image' ? (
                            <>
                              <ImageIcon className="w-3 h-3 text-emerald-450" /> Citra
                            </>
                          ) : (
                            <>
                              <FileText className="w-3 h-3 text-emerald-450" /> Teks
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 text-center text-emerald-300">
                        {ans ? `${ans.attemptsCount}x Klik` : '-'}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Terpecahkan
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onRestart}
          className="group relative px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="absolute inset-px bg-[#040804] rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></span>
          
          <span className="relative z-10 flex items-center gap-2 group-hover:text-black text-emerald-400 font-mono transition-colors">
            <RotateCcw className="w-4 h-4" />
            Mulai Ulang Investigasi
          </span>
        </button>
      </div>
    </div>
  );
}
