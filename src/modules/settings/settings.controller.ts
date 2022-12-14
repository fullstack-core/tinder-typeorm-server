import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRolesEnum } from "../../constants/enum";
import { Roles } from "../auth/decorator";
import { JwtAuthGuard, RolesGuard } from "../auth/guards";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { SettingsService } from "./settings.service";

@Controller("secure/settings")
@ApiTags("settings")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Roles(UserRolesEnum.ADMIN)
  @Post()
  createSetting(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.createSetting(createSettingDto);
  }

  @Get()
  findSetting() {
    return this.settingsService.findSetting();
  }

  @Roles(UserRolesEnum.ADMIN)
  @Put()
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.updateSetting(updateSettingDto);
  }
}
