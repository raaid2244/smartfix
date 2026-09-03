$lines = Get-Content -Path "C:\Users\Welcome\.gemini\antigravity-ide\brain\80c437e8-8843-4f48-99da-763ae6c1a9eb\.system_generated\logs\transcript.jsonl"
foreach ($line in $lines) {
  try {
    $json = $line | ConvertFrom-Json
    if ($json.type -eq 'VIEW_FILE' -or $json.type -eq 'RUN_COMMAND') {
      if ($json.content -match 'AboutHeroKinetic|AboutSection|CompanyStoryScroll|MissionVisionModern') {
        $json.content | Out-File -Append .\all_about_history.txt -Encoding utf8
      }
    }
  } catch {}
}
